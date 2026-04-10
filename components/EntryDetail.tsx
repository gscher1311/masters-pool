import { type GolferResult } from "@/lib/scoring";

interface EntryDetailProps {
  golfers: GolferResult[];
  currentRound: number;
}

export default function EntryDetail({ golfers, currentRound }: EntryDetailProps) {
  const hasDrops = golfers.some((g) => g.droppedRounds.some(Boolean));

  return (
    <div className="bg-cream/50 border-t border-masters-green/10 px-3 py-3 overflow-x-auto">
      <table className="w-full text-sm min-w-[320px]">
        <thead>
          <tr className="text-[11px] text-gray-500 uppercase tracking-wide">
            <th className="text-left pb-1.5 font-medium">Golfer</th>
            {Array.from({ length: currentRound }, (_, i) => (
              <th key={i} className="text-center pb-1.5 font-medium w-10">
                R{i + 1}
              </th>
            ))}
            <th className="text-center pb-1.5 font-medium w-12">Score</th>
          </tr>
        </thead>
        <tbody>
          {golfers.map((g, i) => (
            <tr
              key={i}
              className={`${!g.matched ? "text-red-500" : ""} ${g.isCut ? "text-gray-400" : ""}`}
            >
              <td className="py-1 text-left pr-2">
                <span className="text-[13px]">{g.golferName}</span>
                {g.isCut && (
                  <span className="ml-1 text-[9px] text-red-400 align-middle">CUT</span>
                )}
                {g.eagles > 0 && (
                  <span className="ml-1 text-[9px] text-masters-gold font-bold align-middle">
                    {g.eagles}E
                  </span>
                )}
              </td>
              {Array.from({ length: currentRound }, (_, r) => {
                const pos = g.positionDisplays[r];
                const isDropped = g.droppedRounds[r];
                return (
                  <td
                    key={r}
                    className={`py-1 text-center font-mono text-[12px] ${
                      isDropped ? "text-gray-300 line-through" : ""
                    } ${pos?.includes("*") ? "text-gray-500 italic" : ""}`}
                  >
                    {pos ?? "-"}
                  </td>
                );
              })}
              <td className="py-1 text-center font-mono text-[12px]">{g.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasDrops && (
        <p className="text-[10px] text-gray-400 mt-1.5">Strikethrough = dropped (worst pick excluded after cut)</p>
      )}
    </div>
  );
}
