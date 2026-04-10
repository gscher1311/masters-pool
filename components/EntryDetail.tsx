import { type GolferResult } from "@/lib/scoring";

interface EntryDetailProps {
  golfers: GolferResult[];
  currentRound: number;
}

export default function EntryDetail({ golfers, currentRound }: EntryDetailProps) {
  // Check if any golfer is dropped in any round
  const hasDrops = golfers.some((g) => g.droppedRounds.some(Boolean));

  return (
    <div className="bg-cream/50 border-t border-masters-green/10 px-4 py-3">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left pb-1 font-medium">Golfer</th>
            {Array.from({ length: currentRound }, (_, i) => (
              <th key={i} className="text-center pb-1 font-medium w-12">
                R{i + 1}
              </th>
            ))}
            <th className="text-center pb-1 font-medium w-14">Score</th>
          </tr>
        </thead>
        <tbody>
          {golfers.map((g, i) => {
            const isDroppedAnyRound = g.droppedRounds.some(Boolean);
            return (
              <tr
                key={i}
                className={`${!g.matched ? "text-red-500" : ""}`}
              >
                <td className="py-0.5 text-left">
                  <span className={g.isCut ? "text-gray-400" : ""}>
                    {g.golferName}
                  </span>
                  {g.isCut && (
                    <span className="ml-1 text-[10px] text-red-400 inline-block">CUT</span>
                  )}
                  {g.eagles > 0 && (
                    <span className="ml-1 text-[10px] text-masters-gold inline-block">
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
                      className={`py-0.5 text-center font-mono text-xs ${
                        isDropped ? "text-gray-300 line-through" : ""
                      } ${pos?.includes("*") ? "text-gray-500 italic" : ""}`}
                    >
                      {pos ?? "-"}
                    </td>
                  );
                })}
                <td className="py-0.5 text-center font-mono text-xs">{g.totalScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {hasDrops && (
        <p className="text-[10px] text-gray-400 mt-1">Strikethrough = dropped (worst pick excluded after cut)</p>
      )}
    </div>
  );
}
