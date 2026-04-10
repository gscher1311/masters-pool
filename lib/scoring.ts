import { type GolferScore, normalizeName } from "./espn";
import { type PoolEntry } from "./entries";

export interface GolferResult {
  pick: string;           // original pick name
  golferName: string;     // ESPN display name
  position: number;       // ordinal position
  positionDisplay: string;
  totalScore: string;
  eagles: number;
  matched: boolean;
  dropped: boolean;       // true if this is the dropped worst pick (post-cut)
}

export interface EntryResult {
  name: string;
  golfers: GolferResult[];
  dailyScores: { round: number; score: number }[];
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
 * Calculate pool results by matching entries to ESPN leaderboard
 */
export function calculatePoolResults(
  entries: PoolEntry[],
  golfers: Map<string, GolferScore>,
  currentRound: number,
  roundComplete: boolean,
  tournamentName: string,
  cutLine: number,
): PoolResults {
  const unmatchedPicks: string[] = [];
  const isAfterCut = currentRound >= 3;

  const entryResults: EntryResult[] = entries.map((entry) => {
    const golferResults: GolferResult[] = entry.picks.map((pick) => {
      const normalized = normalizeName(pick);
      const golfer = golfers.get(normalized);

      if (!golfer) {
        if (!unmatchedPicks.includes(pick)) unmatchedPicks.push(pick);
        return {
          pick,
          golferName: pick,
          position: cutLine,
          positionDisplay: "N/A",
          totalScore: "N/A",
          eagles: 0,
          matched: false,
          dropped: false,
        };
      }

      return {
        pick,
        golferName: golfer.name,
        position: golfer.position,
        positionDisplay: golfer.positionDisplay,
        totalScore: golfer.totalScore,
        eagles: golfer.eagles,
        matched: true,
        dropped: false,
      };
    });

    // Calculate daily scores per round
    const dailyScores: { round: number; score: number }[] = [];
    for (let r = 1; r <= currentRound; r++) {
      const roundPositions = golferResults.map((g) => {
        // For now, use overall position (ESPN gives cumulative leaderboard)
        return g.position;
      });

      // After cut: drop worst score (best 6 of 7)
      if (r >= 3 && isAfterCut) {
        const sorted = [...roundPositions].sort((a, b) => a - b);
        dailyScores.push({ round: r, score: sorted.slice(0, 6).reduce((a, b) => a + b, 0) });
      } else {
        dailyScores.push({ round: r, score: roundPositions.reduce((a, b) => a + b, 0) });
      }
    }

    // Mark the dropped golfer (the worst position, post-cut)
    if (isAfterCut) {
      let worstIdx = 0;
      let worstPos = -1;
      golferResults.forEach((g, i) => {
        if (g.position > worstPos) {
          worstPos = g.position;
          worstIdx = i;
        }
      });
      golferResults[worstIdx].dropped = true;
    }

    // Total = sum of daily scores (for now, just the current cumulative score)
    const totalScore = dailyScores.length > 0
      ? dailyScores[dailyScores.length - 1].score
      : 0;

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

  // Mark DFL (last place)
  if (entryResults.length > 0) {
    const lastScore = entryResults[entryResults.length - 1].totalScore;
    for (let i = entryResults.length - 1; i >= 0; i--) {
      if (entryResults[i].totalScore === lastScore) {
        entryResults[i].isDFL = true;
      } else break;
    }
  }

  // Eagle leaders
  const eagleMap = new Map<string, number>();
  for (const [, golfer] of golfers) {
    if (golfer.eagles > 0) {
      eagleMap.set(golfer.name, golfer.eagles);
    }
  }
  const eagleLeaders = [...eagleMap.entries()]
    .map(([golferName, eagles]) => ({ golferName, eagles }))
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
