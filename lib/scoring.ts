import { type GolferData, normalizeName } from "./espn";
import { type PoolEntry } from "./entries";

export interface GolferResult {
  pick: string;           // original pick name
  golferName: string;     // ESPN display name
  positions: (number | null)[];  // ordinal position per round [R1, R2, R3, R4]
  positionDisplays: (string | null)[];
  totalScore: string;
  eagles: number;
  matched: boolean;
  droppedRounds: boolean[]; // which rounds this golfer was dropped (post-cut)
  isCut: boolean;
  thru: string;
}

export interface EntryResult {
  name: string;
  golfers: GolferResult[];
  dailyScores: { round: number; score: number; isDropping: boolean }[];
  totalScore: number;
  rank: number;
  rankDisplay: string;
  isDFL: boolean;
}

export interface PoolResults {
  entries: EntryResult[];
  currentRound: number;
  roundComplete: boolean;
  tournamentName: string;
  lastUpdated: string;
  eagleLeaders: { golferName: string; eagles: number }[];
  unmatchedPicks: string[];
}

/**
 * Compute ordinal positions for a given round by sorting golfers
 * on cumulative strokes through that round.
 *
 * Returns Map<normalizedName, { position, display }>
 */
function computeRoundPositions(
  golfers: GolferData[],
  throughRound: number, // 1-indexed: 1 = after R1, 2 = after R1+R2
  cutLine: number,
): Map<string, { position: number; display: string }> {
  // Calculate cumulative strokes through this round for each golfer
  const entries: { name: string; normalized: string; cumStrokes: number; isCut: boolean }[] = [];

  for (const g of golfers) {
    let cumStrokes = 0;
    let hasAllRounds = true;
    for (let r = 0; r < throughRound; r++) {
      if (g.roundStrokes[r] != null) {
        cumStrokes += g.roundStrokes[r]!;
      } else {
        hasAllRounds = false;
        break;
      }
    }

    if (hasAllRounds) {
      entries.push({
        name: g.name,
        normalized: g.normalizedName,
        cumStrokes,
        isCut: g.isCut,
      });
    } else if (throughRound >= 3 && g.isCut) {
      // Cut golfer in R3+: they get cutLine position
      // Don't add to sorted list — handled below
    }
  }

  // Sort by cumulative strokes (lower = better)
  entries.sort((a, b) => a.cumStrokes - b.cumStrokes);

  // Assign ordinal positions with tie handling
  const result = new Map<string, { position: number; display: string }>();
  const strokeCount = new Map<number, number>();
  for (const e of entries) {
    strokeCount.set(e.cumStrokes, (strokeCount.get(e.cumStrokes) || 0) + 1);
  }

  let prevStrokes = -1;
  let position = 0;
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].cumStrokes !== prevStrokes) {
      position = i + 1;
      prevStrokes = entries[i].cumStrokes;
    }
    const isTied = (strokeCount.get(entries[i].cumStrokes) || 0) > 1;
    result.set(entries[i].normalized, {
      position,
      display: isTied ? `T${position}` : `${position}`,
    });
  }

  // Assign cutLine to cut golfers who don't have data for this round
  for (const g of golfers) {
    if (!result.has(g.normalizedName)) {
      if (throughRound >= 3 && g.isCut) {
        result.set(g.normalizedName, { position: cutLine, display: "CUT" });
      }
    }
  }

  return result;
}

/**
 * For the current in-progress round, use ESPN's live order as estimated positions.
 */
function computeLivePositions(
  golfers: GolferData[],
): Map<string, { position: number; display: string }> {
  const sorted = [...golfers].sort((a, b) => a.currentOrder - b.currentOrder);

  const result = new Map<string, { position: number; display: string }>();
  const scoreCount = new Map<string, number>();
  for (const g of sorted) {
    scoreCount.set(g.totalScore, (scoreCount.get(g.totalScore) || 0) + 1);
  }

  let prevScore = "";
  let position = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].totalScore !== prevScore) {
      position = i + 1;
      prevScore = sorted[i].totalScore;
    }
    const isTied = (scoreCount.get(sorted[i].totalScore) || 0) > 1;
    result.set(sorted[i].normalizedName, {
      position,
      display: isTied ? `T${position}` : `${position}`,
    });
  }

  return result;
}

/**
 * Calculate pool results by matching entries to ESPN leaderboard.
 * Computes per-round ordinal positions from stroke data.
 */
export function calculatePoolResults(
  entries: PoolEntry[],
  golfers: GolferData[],
  currentRound: number,
  roundComplete: boolean,
  tournamentName: string,
): PoolResults {
  const unmatchedPicks: string[] = [];

  // Build golfer lookup
  const golferMap = new Map<string, GolferData>();
  for (const g of golfers) {
    golferMap.set(g.normalizedName, g);
  }

  // Determine cut line: number of golfers who made cut + 1
  // For R1-R2, cutLine = total golfers + 1 (no cut yet)
  const madeCutCount = currentRound >= 3
    ? golfers.filter((g) => !g.isCut).length
    : golfers.length;
  const cutLine = madeCutCount + 1;

  // Compute ordinal positions for each completed round
  const roundPositions: Map<string, { position: number; display: string }>[] = [];
  const lastCompletedRound = roundComplete ? currentRound : currentRound - 1;

  for (let r = 1; r <= lastCompletedRound; r++) {
    roundPositions.push(computeRoundPositions(golfers, r, cutLine));
  }

  // If current round is in progress, add live estimated positions
  let livePositions: Map<string, { position: number; display: string }> | null = null;
  if (!roundComplete && currentRound >= 1) {
    livePositions = computeLivePositions(golfers);
  }

  // Total rounds with data (completed + possibly in-progress)
  const totalScoringRounds = roundComplete ? currentRound : currentRound;

  const entryResults: EntryResult[] = entries.map((entry) => {
    const golferResults: GolferResult[] = entry.picks.map((pick) => {
      const normalized = normalizeName(pick);
      const golfer = golferMap.get(normalized);

      if (!golfer) {
        if (!unmatchedPicks.includes(pick)) unmatchedPicks.push(pick);
        return {
          pick,
          golferName: pick,
          positions: [null, null, null, null],
          positionDisplays: [null, null, null, null],
          totalScore: "N/A",
          eagles: 0,
          matched: false,
          droppedRounds: [false, false, false, false],
          isCut: false,
          thru: "",
        };
      }

      // Get position for each round
      const positions: (number | null)[] = [null, null, null, null];
      const positionDisplays: (string | null)[] = [null, null, null, null];

      // Completed rounds: use computed positions from stroke data
      for (let r = 0; r < lastCompletedRound; r++) {
        const pos = roundPositions[r]?.get(normalized);
        if (pos) {
          positions[r] = pos.position;
          positionDisplays[r] = pos.display;
        } else if (r >= 2 && golfer.isCut) {
          positions[r] = cutLine;
          positionDisplays[r] = "CUT";
        }
      }

      // Current in-progress round: use live positions
      if (!roundComplete && livePositions) {
        const livePos = livePositions.get(normalized);
        if (livePos) {
          positions[currentRound - 1] = livePos.position;
          positionDisplays[currentRound - 1] = livePos.display + "*";
        }
      }

      return {
        pick,
        golferName: golfer.name,
        positions,
        positionDisplays,
        totalScore: golfer.totalScore,
        eagles: golfer.eagles,
        matched: true,
        droppedRounds: [false, false, false, false],
        isCut: golfer.isCut,
        thru: golfer.thru,
      };
    });

    // Calculate daily scores per round
    const dailyScores: { round: number; score: number; isDropping: boolean }[] = [];

    for (let r = 0; r < totalScoringRounds; r++) {
      const isAfterCut = (r + 1) >= 3;
      const roundIdx = r;

      // Get positions for this round
      const positionsThisRound = golferResults
        .map((g, i) => ({
          position: g.positions[roundIdx] ?? cutLine,
          idx: i,
          matched: g.matched,
        }))
        .filter((p) => p.matched);

      // Add unmatched golfers at cutLine
      const unmatchedCount = golferResults.filter((g) => !g.matched).length;
      const unmatchedPositions = Array(unmatchedCount).fill(cutLine);

      let allPositions = [...positionsThisRound.map((p) => p.position), ...unmatchedPositions];

      // After cut: drop worst score (best 6 of 7)
      if (isAfterCut && allPositions.length === 7) {
        const maxPos = Math.max(...allPositions);
        const maxIdx = allPositions.indexOf(maxPos);

        // Find which golfer to mark as dropped this round
        if (maxIdx < positionsThisRound.length) {
          const golferIdx = positionsThisRound[maxIdx].idx;
          golferResults[golferIdx].droppedRounds[roundIdx] = true;
        }

        // Remove worst
        const sorted = [...allPositions].sort((a, b) => a - b);
        allPositions = sorted.slice(0, 6);
      }

      const roundScore = allPositions.reduce((a, b) => a + b, 0);
      dailyScores.push({ round: r + 1, score: roundScore, isDropping: isAfterCut });
    }

    // Overall = sum of ALL daily scores
    const totalScore = dailyScores.reduce((sum, d) => sum + d.score, 0);

    return {
      name: entry.name,
      golfers: golferResults,
      dailyScores,
      totalScore,
      rank: 0,
      rankDisplay: "",
      isDFL: false,
    };
  });

  // Sort by total score (ascending = best)
  entryResults.sort((a, b) => a.totalScore - b.totalScore);

  // Assign ranks with tie handling
  let prevScore = -1;
  let rank = 0;
  const scoreCount = new Map<number, number>();
  for (const e of entryResults) {
    scoreCount.set(e.totalScore, (scoreCount.get(e.totalScore) || 0) + 1);
  }

  for (let i = 0; i < entryResults.length; i++) {
    if (entryResults[i].totalScore !== prevScore) {
      rank = i + 1;
      prevScore = entryResults[i].totalScore;
    }
    entryResults[i].rank = rank;
    const isTied = (scoreCount.get(entryResults[i].totalScore) || 0) > 1;
    entryResults[i].rankDisplay = isTied ? `T${rank}` : `${rank}`;
  }

  // Mark DFL
  if (entryResults.length > 0) {
    const lastScore = entryResults[entryResults.length - 1].totalScore;
    for (let i = entryResults.length - 1; i >= 0; i--) {
      if (entryResults[i].totalScore === lastScore) {
        entryResults[i].isDFL = true;
      } else break;
    }
  }

  // Eagle leaders
  const eagleLeaders = golfers
    .filter((g) => g.eagles > 0)
    .map((g) => ({ golferName: g.name, eagles: g.eagles }))
    .sort((a, b) => b.eagles - a.eagles)
    .slice(0, 10);

  return {
    entries: entryResults,
    currentRound,
    roundComplete,
    tournamentName,
    lastUpdated: new Date().toISOString(),
    eagleLeaders,
    unmatchedPicks,
  };
}
