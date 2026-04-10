import { type GolferResult } from "@/lib/scoring";

interface EntryDetailProps {
  golfers: GolferResult[];
  isAfterCut: boolean;
}

export default function EntryDetail({ golfers, isAfterCut }: EntryDetailProps) {
  return (
    <div className="bg-cream/50 border-t border-masters-green/10 px-4 py-3">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left pb-1 font-medium">Golfer</th>
            <th className="text-center pb-1 font-medium w-16">Pos</th>
            <th className="text-center pb-1 font-medium w-16">Score</th>
            {isAfterCut && <th className="text-center pb-1 font-medium w-12">Eagles</th>}
          </tr>
        </thead>
        <tbody>
          {golfers.map((g, i) => (
            <tr
              key={i}
              className={`${g.dropped ? "text-gray-400 line-through" : ""} ${!g.matched ? "text-red-500" : ""}`}
            >
              <td className="py-0.5 text-left">
                {g.golferName}
                {g.dropped && (
                  <span className="ml-1 text-[10px] text-gray-400 no-underline inline-block">(dropped)</span>
                )}
                {g.eagles > 0 && (
                  <span className="ml-1 text-[10px] text-masters-gold no-underline inline-block">
                    {g.eagles} eagle{g.eagles > 1 ? "s" : ""}
                  </span>
                )}
              </td>
              <td className="py-0.5 text-center font-mono text-xs">{g.positionDisplay}</td>
              <td className="py-0.5 text-center font-mono text-xs">{g.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
