const ESPN_URL = "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard";

export interface GolferScore {
  name: string;
  position: number;       // computed ordinal (ties get same number)
  positionDisplay: string; // "T5", "1", etc.
  totalScore: string;     // "-5", "+2", "E"
  roundScores: { round: number; strokes: number; display: string }[];
  status: "active" | "cut" | "wd" | "dq";
  eagles: number;
  thru: string;           // "F", "12", etc. (for in-progress rounds)
}

export interface LeaderboardData {
  golfers: Map<string, GolferScore>;
  currentRound: number;
  roundComplete: boolean;
  tournamentName: string;
  lastUpdated: string;
  cutLine: number;
  totalGolfers: number;
}

/**
 * Normalize golfer names for matching.
 * Handles: ø→o, å→a, é→e, á→a, í→i, ú→u, then NFD + strip accents
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

  // Sort by order
  const sorted = [...competitors].sort((a, b) => a.order - b.order);

  // Count how many per score for tie detection
  const scoreCount = new Map<string, number>();
  for (const c of sorted) {
    scoreCount.set(c.score, (scoreCount.get(c.score) || 0) + 1);
  }

  // Compute ordinal positions with ties
  const golfers = new Map<string, GolferScore>();
  let prevScore = "";
  let position = 0;

  for (let i = 0; i < sorted.length; i++) {
    const c = sorted[i];
    if (c.score !== prevScore) {
      position = i + 1;
      prevScore = c.score;
    }

    const isTied = (scoreCount.get(c.score) || 0) > 1;
    const posDisplay = isTied ? `T${position}` : `${position}`;

    // Parse round scores
    const roundScores: GolferScore["roundScores"] = [];
    let totalEagles = 0;
    let thru = "F";

    if (c.linescores) {
      for (const ls of c.linescores) {
        if (ls.value != null) {
          roundScores.push({
            round: ls.period,
            strokes: ls.value,
            display: ls.displayValue || String(ls.value),
          });

          // Count eagles from hole-by-hole
          if (ls.linescores) {
            for (const hole of ls.linescores) {
              const st = hole.scoreType?.displayValue;
              if (st === "-2" || st === "-3") totalEagles++;
            }
          }
        } else {
          // In-progress round: count completed holes for "thru"
          if (ls.linescores && ls.linescores.length > 0) {
            const completedHoles = ls.linescores.length;
            thru = completedHoles >= 18 ? "F" : String(completedHoles);

            // Still count eagles for in-progress rounds
            for (const hole of ls.linescores) {
              const st = hole.scoreType?.displayValue;
              if (st === "-2" || st === "-3") totalEagles++;
            }
          }
        }
      }
    }

    // If all rounds have values, thru = F
    if (roundScores.length === currentRound) thru = "F";

    const normalized = normalizeName(c.athlete.fullName);
    golfers.set(normalized, {
      name: c.athlete.fullName,
      position,
      positionDisplay: posDisplay,
      totalScore: c.score,
      roundScores,
      status: "active", // Will be updated when cut info available
      eagles: totalEagles,
      thru,
    });
  }

  // Cut line: for now, total golfers + 1 (updated after Round 2 when cuts happen)
  const cutLine = sorted.length + 1;

  return {
    golfers,
    currentRound,
    roundComplete,
    tournamentName: event.name || "Masters Tournament",
    lastUpdated: new Date().toISOString(),
    cutLine,
    totalGolfers: sorted.length,
  };
}
