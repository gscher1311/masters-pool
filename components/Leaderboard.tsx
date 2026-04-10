"use client";

import { useState } from "react";
import { type EntryResult } from "@/lib/scoring";
import EntryDetail from "./EntryDetail";

interface LeaderboardProps {
  entries: EntryResult[];
  currentRound: number;
}

export default function Leaderboard({ entries, currentRound }: LeaderboardProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const isAfterCut = currentRound >= 3;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Column headers */}
      <div className="flex items-center px-4 py-2 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
        <span className="w-12 text-center font-medium">#</span>
        <span className="flex-1 font-medium">Entry</span>
        <span className="w-16 text-center font-medium">Score</span>
      </div>

      {entries.map((entry, idx) => {
        const isExpanded = expandedIdx === idx;
        const isTop5 = entry.rank <= 5;
        const isDFL = entry.isDFL;

        return (
          <div key={entry.name} className="border-b border-gray-100">
            <button
              onClick={() => setExpandedIdx(isExpanded ? null : idx)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-cream/30 transition-colors ${
                isTop5 ? "bg-masters-gold/5" : ""
              } ${isDFL ? "bg-red-50" : ""}`}
            >
              {/* Rank */}
              <span className={`w-12 text-center font-mono text-sm ${
                entry.rank === 1 ? "text-masters-gold font-bold" : "text-gray-600"
              }`}>
                {entry.rankDisplay}
              </span>

              {/* Name */}
              <span className="flex-1 font-medium text-charcoal">
                {entry.name}
                {isDFL && (
                  <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase font-bold">
                    DFL
                  </span>
                )}
                {entry.rank === 1 && (
                  <span className="ml-2 text-[10px] bg-masters-gold/20 text-masters-green px-1.5 py-0.5 rounded uppercase font-bold">
                    Leader
                  </span>
                )}
              </span>

              {/* Score */}
              <span className="w-16 text-center font-mono font-bold text-charcoal">
                {entry.totalScore}
              </span>

              {/* Expand arrow */}
              <span className={`ml-2 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                &#9662;
              </span>
            </button>

            {isExpanded && (
              <EntryDetail golfers={entry.golfers} isAfterCut={isAfterCut} />
            )}
          </div>
        );
      })}
    </div>
  );
}
