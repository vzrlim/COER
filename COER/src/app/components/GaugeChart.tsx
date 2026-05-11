interface GaugeChartProps {
  title: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  optimalMin: number;
  optimalMax: number;
  icon: React.ReactNode;
}

// Generate simple trend data (7 data points showing recent history)
const generateTrendData = (currentValue: number) => {
  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 0.3;
    trend.push(currentValue + variation - (i * 0.05));
  }
  return trend;
};

export function GaugeChart({ title, value, min, max, unit, optimalMin, optimalMax, icon }: GaugeChartProps) {
  const isInOptimalRange = value >= optimalMin && value <= optimalMax;
  const trendData = generateTrendData(value);
  const trendMin = Math.min(...trendData);
  const trendMax = Math.max(...trendData);

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <h3 className="text-sm text-muted-foreground">{title}</h3>
      </div>

      {/* Main value and status */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-foreground">{value.toFixed(2)}</span>
            <span className="text-lg text-muted-foreground">{unit}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Range: {optimalMin}–{optimalMax} {unit}
          </div>
        </div>
        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
          isInOptimalRange
            ? 'bg-[#e8f0e9] text-[#4a6b4d] border border-[#7a9b7f]/30'
            : 'bg-[#fef5e6] text-[#8b6914] border border-[#e8b86d]/30'
        }`}>
          Status: {isInOptimalRange ? 'Optimal' : 'Warning'}
        </span>
      </div>

      {/* Trend sparkline */}
      <div className="mt-4">
        <div className="text-xs text-muted-foreground mb-2">7-Day Trend</div>
        <svg width="100%" height="40" className="overflow-visible">
          <polyline
            points={trendData
              .map((val, idx) => {
                const x = (idx / (trendData.length - 1)) * 100;
                const y = 35 - ((val - trendMin) / (trendMax - trendMin)) * 30;
                return `${x}%,${y}`;
              })
              .join(' ')}
            fill="none"
            stroke={isInOptimalRange ? '#7a9b7f' : '#e8b86d'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dot on current value */}
          <circle
            cx="100%"
            cy={35 - ((trendData[trendData.length - 1] - trendMin) / (trendMax - trendMin)) * 30}
            r="3"
            fill={isInOptimalRange ? '#7a9b7f' : '#e8b86d'}
          />
        </svg>
      </div>
    </div>
  );
}
