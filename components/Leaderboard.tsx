"use client";

import { useState, useRef, useEffect } from "react";
import { type EntryResult } from "@/lib/scoring";
import EntryDetail from "./EntryDetail";

interface LeaderboardProps {
  entries: EntryResult[];
  currentRound: number;
}

export default function Leaderboard({ entries, currentRound }: LeaderboardProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const expandedRef = useRef<HTMLDivElement>(null);

  // Scroll expanded row into view on mobile
  useEffect(() => {
    if (expandedIdx !== null && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  }, [expandedIdx]);

  const filtered = search
    ? entries.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    : entries;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search */}
      <div className="px-4 py-2 sticky top-0 z-20 bg-cream">
        <input
          type="text"
          placeholder="Search entries..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setExpandedIdx(null);
          }}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-masters-green/30 focus:border-masters-green/50"
        />
      </div>

      {/* Column headers */}
      <div className="flex items-center px-4 py-2 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-200 bg-gray-50 sticky top-[52px] z-10">
        <span className="w-10 text-center font-medium">#</span>
        <span className="flex-1 font-medium">Entry</span>
        {currentRound >= 2 && entries[0]?.dailyScores.map((_, i) => (
          <span key={i} className="w-10 text-center font-medium hidden sm:block">R{i + 1}</span>
        ))}
        <span className="w-14 text-center font-medium">Total</span>
        <span className="w-6" />
      </div>

      {filtered.length === 0 && search && (
        <div className="px-4 py-8 text-center text-gray-400 text-sm">
          No entries matching &ldquo;{search}&rdquo;
        </div>
      )}

      {filtered.map((entry) => {
        // Use the original index from the full entries array for expand tracking
        const originalIdx = entries.indexOf(entry);
        const isExpanded = expandedIdx === originalIdx;
        const isTop5 = entry.rank <= 5;
        const isDFL = entry.isDFL;

        return (
          <div key={entry.name} className="border-b border-gray-100" ref={isExpanded ? expandedRef : undefined}>
            <button
              onClick={() => setExpandedIdx(isExpanded ? null : originalIdx)}
              className={`w-full flex items-center px-4 py-3.5 text-left active:bg-gray-100 transition-colors touch-manipulation ${
                isTop5 ? "bg-masters-gold/5" : ""
              } ${isDFL ? "bg-red-50" : ""}`}
            >
              {/* Rank */}
              <span className={`w-10 text-center font-mono text-sm shrink-0 ${
                entry.rank === 1 ? "text-masters-gold font-bold" : "text-gray-600"
              }`}>
                {entry.rankDisplay}
              </span>

              {/* Name + badges */}
              <span className="flex-1 min-w-0">
                <span className="font-medium text-charcoal text-[15px] truncate block">
                  {entry.name}
                </span>
                {(isDFL || entry.rank === 1) && (
                  <span className="mt-0.5 flex gap-1">
                    {isDFL && (
                      <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase font-bold inline-block">
                        DFL
                      </span>
                    )}
                    {entry.rank === 1 && (
                      <span className="text-[10px] bg-masters-gold/20 text-masters-green px-1.5 py-0.5 rounded uppercase font-bold inline-block">
                        Leader
                      </span>
                    )}
                  </span>
                )}
              </span>

              {/* Per-round scores (desktop, multi-round only) */}
              {currentRound >= 2 && entry.dailyScores.map((d, i) => (
                <span key={i} className="w-10 text-center font-mono text-xs text-gray-500 hidden sm:block shrink-0">
                  {d.score}
                </span>
              ))}

              {/* Total */}
              <span className="w-14 text-center font-mono font-bold text-charcoal text-[15px] shrink-0">
                {entry.totalScore}
              </span>

              {/* Expand arrow */}
              <span className={`w-6 text-center text-gray-400 transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`}>
                &#9662;
              </span>
            </button>

            {isExpanded && (
              <EntryDetail golfers={entry.golfers} currentRound={currentRound} />
            )}
          </div>
        );
      })}
    </div>
  );
}
