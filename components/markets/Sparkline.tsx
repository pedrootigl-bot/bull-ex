import type { MarketChange } from "./marketsConfig";

type SparklineProps = {
  series: readonly number[];
  direction: MarketChange;
  gradientId: string;
};

function chartColor(direction: MarketChange) {
  switch (direction) {
    case "positive":
      return "#22c55e";
    case "negative":
      return "#ef4444";
    default: {
      const _exhaustive: never = direction;
      return _exhaustive;
    }
  }
}

export function Sparkline({ series, direction, gradientId }: SparklineProps) {
  const width = 128;
  const height = 42;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const color = chartColor(direction);

  const coords = series.map((value, index) => {
    const x = (index / Math.max(series.length - 1, 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const line = coords.join(" ");
  const area = `0,${height} ${line} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="42" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gradientId})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
