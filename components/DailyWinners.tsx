import { type EntryResult } from "@/lib/scoring";

interface DailyWinnersProps {
  entries: EntryResult[];
  currentRound: number;
}

export default function DailyWinners({ entries, currentRound }: DailyWinnersProps) {
  // Top 5 and DFL
  const top5 = entries.slice(0, 5);
  const dfl = entries.filter((e) => e.isDFL);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="bg-white rounded-lg border border-masters-green/20 overflow-hidden">
        <div className="bg-masters-green/5 px-4 py-2 border-b border-masters-green/10">
          <h2 className="font-serif text-lg text-masters-green font-bold">
            Round {currentRound} Leaders
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {top5.map((entry, i) => (
            <div key={entry.name} className="flex items-center px-4 py-2">
              <span className={`w-8 font-mono text-sm font-bold ${
                i === 0 ? "text-masters-gold" : "text-gray-500"
              }`}>
                {entry.rankDisplay}
              </span>
              <span className="flex-1 text-sm font-medium text-charcoal">{entry.name}</span>
              <span className="font-mono text-sm font-bold text-charcoal">{entry.totalScore}</span>
              {i < 3 && (
                <span className="ml-2 text-[10px] text-masters-gold">
                  {i === 0 ? "$450" : "$312"}
                </span>
              )}
              {i === 3 && <span className="ml-2 text-[10px] text-masters-gold">$225</span>}
              {i === 4 && <span className="ml-2 text-[10px] text-masters-gold">$175</span>}
            </div>
          ))}
        </div>

        {dfl.length > 0 && (
          <div className="border-t border-red-100 bg-red-50/50 px-4 py-2">
            <div className="flex items-center">
              <span className="text-xs font-bold text-red-500 uppercase mr-2">DFL</span>
              <span className="flex-1 text-sm text-red-700">
                {dfl.map((e) => e.name).join(", ")}
              </span>
              <span className="font-mono text-sm font-bold text-red-600">{dfl[0].totalScore}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
