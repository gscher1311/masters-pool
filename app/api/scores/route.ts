import { NextResponse } from "next/server";
import { fetchLeaderboard } from "@/lib/espn";
import { POOL_ENTRIES } from "@/lib/entries";
import { calculatePoolResults } from "@/lib/scoring";

export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    const leaderboard = await fetchLeaderboard();

    const results = calculatePoolResults(
      POOL_ENTRIES,
      leaderboard.golfers,
      leaderboard.currentRound,
      leaderboard.roundComplete,
      leaderboard.tournamentName,
      leaderboard.cutLine,
    );

    if (results.unmatchedPicks.length > 0) {
      console.warn("Unmatched golfer picks:", results.unmatchedPicks);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch scores:", error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 },
    );
  }
}
