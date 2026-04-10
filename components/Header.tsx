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
    <header className="bg-masters-green text-white py-6 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
          Lakeside Masters Pool
        </h1>
        <p className="text-masters-gold font-serif text-lg mt-1">2026</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-green-100">
          <span>Round {currentRound} &mdash; {roundStatus}</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>Updated {updatedAt}</span>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="ml-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </header>
  );
}
