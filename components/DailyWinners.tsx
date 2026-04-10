import { type EntryResult } from "@/lib/scoring";

interface DailyWinnersProps {
  entries: EntryResult[];
  currentRound: number;
}

const DAILY_PRIZES = ["$450", "$312", "$312", "$225", "$175"];

export default function DailyWinners({ entries, currentRound }: DailyWinnersProps) {
  const top5 = entries.slice(0, 5);
  const dfl = entries.filter((e) => e.isDFL);

  return (
    <div className="max-w-4xl mx-auto px-4 py-3">
      <div className="bg-white rounded-lg border border-masters-green/20 overflow-hidden">
        <div className="bg-masters-green/5 px-4 py-2.5 border-b border-masters-green/10">
          <h2 className="font-serif text-base sm:text-lg text-masters-green font-bold">
            Round {currentRound} Leaders
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {top5.map((entry, i) => (
            <div key={entry.name} className="flex items-center px-3 sm:px-4 py-2.5">
              <span className={`w-9 font-mono text-sm font-bold shrink-0 ${
                i === 0 ? "text-masters-gold" : "text-gray-500"
              }`}>
                {entry.rankDisplay}
              </span>
              <span className="flex-1 text-sm font-medium text-charcoal min-w-0 truncate">
                {entry.name}
              </span>
              <span className="font-mono text-sm font-bold text-charcoal shrink-0 ml-2">
                {entry.totalScore}
              </span>
              <span className="ml-2 text-[10px] text-masters-gold shrink-0 w-8 text-right">
                {DAILY_PRIZES[i]}
              </span>
            </div>
          ))}
        </div>

        {dfl.length > 0 && (
          <div className="border-t border-red-100 bg-red-50/50 px-3 sm:px-4 py-2.5">
            <div className="flex items-center">
              <span className="text-[11px] font-bold text-red-500 uppercase mr-2 shrink-0">DFL</span>
              <span className="flex-1 text-sm text-red-700 min-w-0 truncate">
                {dfl.map((e) => e.name).join(", ")}
              </span>
              <span className="font-mono text-sm font-bold text-red-600 shrink-0 ml-2">
                {dfl[0].totalScore}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
