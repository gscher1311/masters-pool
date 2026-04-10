"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import DailyWinners from "@/components/DailyWinners";
import EaglePool from "@/components/EaglePool";
import { type PoolResults } from "@/lib/scoring";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function Home() {
  const [data, setData] = useState<PoolResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/scores");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
      setError(null);
    } catch {
      setError("Failed to load scores. Retrying...");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <main className="flex-1">
      <Header
        tournamentName={data?.tournamentName || "Masters Tournament"}
        currentRound={data?.currentRound || 1}
        roundComplete={data?.roundComplete || false}
        lastUpdated={data?.lastUpdated || ""}
        onRefresh={fetchData}
        loading={loading}
      />

      {error && !data && (
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-red-600">
          {error}
        </div>
      )}

      {data && (
        <>
          <DailyWinners entries={data.entries} currentRound={data.currentRound} />
          <EaglePool eagleLeaders={data.eagleLeaders} />

          {/* Pool info bar */}
          <div className="max-w-4xl mx-auto px-4 pb-2">
            <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
              <span>{data.entries.length} entries &bull; $150/entry &bull; $12,000 pool</span>
              <span>
                {data.currentRound >= 3 ? "Best 6 of 7 picks (drop worst)" : "All 7 picks count"}
              </span>
            </div>
          </div>

          <Leaderboard entries={data.entries} currentRound={data.currentRound} />

          {data.unmatchedPicks.length > 0 && (
            <div className="max-w-4xl mx-auto px-4 py-4 text-xs text-red-500">
              Unmatched golfers: {data.unmatchedPicks.join(", ")}
            </div>
          )}
        </>
      )}

      {loading && !data && (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-masters-green font-serif text-xl">Loading scores...</div>
        </div>
      )}

      <footer className="text-center text-xs text-gray-400 py-6">
        Unofficial pool leaderboard &bull; Scores from ESPN &bull; Auto-refreshes every 5 min
      </footer>
    </main>
  );
}
