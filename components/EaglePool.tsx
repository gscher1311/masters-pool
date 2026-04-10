interface EaglePoolProps {
  eagleLeaders: { golferName: string; eagles: number }[];
}

export default function EaglePool({ eagleLeaders }: EaglePoolProps) {
  if (eagleLeaders.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-2 pb-4">
      <div className="bg-white rounded-lg border border-masters-gold/30 overflow-hidden">
        <div className="bg-masters-gold/10 px-4 py-2 border-b border-masters-gold/20">
          <h2 className="font-serif text-base text-masters-green font-bold">
            Eagle Side Pool ($25)
          </h2>
        </div>
        <div className="px-4 py-2 flex flex-wrap gap-x-6 gap-y-1">
          {eagleLeaders.map((e) => (
            <div key={e.golferName} className="flex items-center gap-1 text-sm">
              <span className="font-medium text-charcoal">{e.golferName}</span>
              <span className="text-masters-gold font-bold">{e.eagles}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
