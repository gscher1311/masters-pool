const ESPN_URL = "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard";

export interface GolferData {
  name: string;
  normalizedName: string;
  roundStrokes: (number | null)[]; // [67, 72, null, null] — strokes per round
  totalScore: string;              // display: "-5", "+2", "E"
  currentOrder: number;            // ESPN live sort order
  eagles: number;
  thru: string;                    // "F" or "12" for in-progress
  isCut: boolean;
  isWD: boolean;
}

export interface LeaderboardData {
  golfers: GolferData[];
  currentRound: number;
  roundComplete: boolean;
  tournamentName: string;
  lastUpdated: string;
}

/**
 * Normalize golfer names for matching.
 * Handles: ø->o, å->a, etc., then NFD + strip combining accents
 */
export function normalizeName(name: string): string {
  return name
    .replace(/\u00f8/g, "o").replace(/\u00d8/g, "O")   // ø Ø
    .replace(/\u00e5/g, "a").replace(/\u00c5/g, "A")   // å Å
    .replace(/\u00e9/g, "e").replace(/\u00c9/g, "E")   // é É
    .replace(/\u00e1/g, "a").replace(/\u00c1/g, "A")   // á Á
    .replace(/\u00ed/g, "i").replace(/\u00cd/g, "I")   // í Í
    .replace(/\u00fa/g, "u").replace(/\u00da/g, "U")   // ú Ú
    .replace(/\u00e4/g, "a").replace(/\u00f6/g, "o")   // ä ö
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.\-']/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

interface ESPNCompetitor {
  order: number;
  score: string;
  athlete: { fullName: string };
  linescores?: ESPNLinescore[];
}

interface ESPNLinescore {
  value?: number;
  displayValue?: string;
  period: number;
  linescores?: ESPNHoleScore[];
}

interface ESPNHoleScore {
  scoreType?: { displayValue?: string };
}

export async function fetchLeaderboard(): Promise<LeaderboardData> {
  const res = await fetch(ESPN_URL, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`ESPN API returned ${res.status}`);
  const data = await res.json();

  const event = data.events?.[0];
  if (!event) throw new Error("No event found in ESPN response");

  const competition = event.competitions[0];
  const competitors: ESPNCompetitor[] = competition.competitors;

  // Round info from competition status
  const statusDetail: string = competition.status?.type?.detail || "";
  const roundMatch = statusDetail.match(/Round (\d)/);
  const currentRound = roundMatch ? parseInt(roundMatch[1], 10) : 1;
  const roundComplete = competition.status?.type?.name === "STATUS_PLAY_COMPLETE" ||
    competition.status?.type?.state === "post";

  const golfers: GolferData[] = competitors.map((c) => {
    const roundStrokes: (number | null)[] = [null, null, null, null];
    let totalEagles = 0;
    let thru = "F";
    let hasInProgressRound = false;

    if (c.linescores) {
      for (const ls of c.linescores) {
        const roundIdx = ls.period - 1;
        if (roundIdx < 0 || roundIdx > 3) continue;

        if (ls.value != null) {
          // Completed round
          roundStrokes[roundIdx] = ls.value;
        } else if (ls.linescores && ls.linescores.length > 0) {
          // In-progress round — count completed holes
          hasInProgressRound = true;
          const completedHoles = ls.linescores.length;
          thru = completedHoles >= 18 ? "F" : String(completedHoles);

          // Compute partial strokes from hole-by-hole
          let partialStrokes = 0;
          for (const hole of ls.linescores) {
            // hole scores are in .value but let's parse from the structure
            // Actually the value is on the hole object directly
            const holeVal = (hole as unknown as { value?: number }).value;
            if (holeVal != null) partialStrokes += holeVal;
          }
          if (partialStrokes > 0) roundStrokes[roundIdx] = partialStrokes;
        }

        // Count eagles from hole-by-hole data (both completed and in-progress rounds)
        if (ls.linescores) {
          for (const hole of ls.linescores) {
            const st = hole.scoreType?.displayValue;
            if (st === "-2" || st === "-3") totalEagles++;
          }
        }
      }
    }

    if (!hasInProgressRound) thru = "F";

    // Detect cut/WD: a golfer is cut if they have completed rounds < currentRound
    // and the current round is >= 3 (cut happens after R2)
    // More precisely: if R3+ is active and this golfer has no R3 data
    const completedRounds = roundStrokes.filter((s) => s !== null).length;
    const isCut = currentRound >= 3 && completedRounds < currentRound && !hasInProgressRound;

    const normalized = normalizeName(c.athlete.fullName);

    return {
      name: c.athlete.fullName,
      normalizedName: normalized,
      roundStrokes,
      totalScore: c.score,
      currentOrder: c.order,
      eagles: totalEagles,
      thru,
      isCut,
      isWD: false, // ESPN doesn't clearly flag this; treat like cut
    };
  });

  return {
    golfers,
    currentRound,
    roundComplete,
    tournamentName: event.name || "Masters Tournament",
    lastUpdated: new Date().toISOString(),
  };
}
