"use client";

interface HeaderProps {
  tournamentName: string;
  currentRound: number;
  roundComplete: boolean;
  lastUpdated: string;
  onRefresh: () => void;
  loading: boolean;
}

export default function Header({
  tournamentName,
  currentRound,
  roundComplete,
  lastUpdated,
  onRefresh,
  loading,
}: HeaderProps) {
  const updatedAt = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const roundStatus = roundComplete ? "Complete" : "In Progress";

  return (
    <header className="bg-masters-green text-white py-5 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Lakeside Masters Pool
        </h1>
        <p className="text-masters-gold font-serif text-base sm:text-lg mt-0.5">2026</p>
        <div className="mt-2 text-sm text-green-100">
          Round {currentRound} &mdash; {roundStatus}
        </div>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="text-xs text-green-200">Updated {updatedAt}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onRefresh();
            }}
            disabled={loading}
            className="px-4 py-2 bg-white/15 active:bg-white/30 hover:bg-white/25 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 min-w-[90px] touch-manipulation"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </header>
  );
}
