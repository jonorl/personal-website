interface MetricTileProps {
  label: string;
  value: string;
  warn: boolean;
}

export default function MetricTile({ label, value, warn }: MetricTileProps) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-lg font-semibold ${warn ? "text-amber-400" : "text-teal-400"}`}>
        {value}
      </p>
    </div>
  );
}
