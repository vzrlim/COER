interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

export function MetricCard({ title, value, unit, icon, trend, trendValue }: MetricCardProps) {
  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    if (trend === 'up') return 'text-chart-1';
    if (trend === 'down') return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          {icon}
        </div>
        {trend && trendValue && (
          <span className={`text-sm ${getTrendColor()}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>
      <h3 className="text-muted-foreground mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-foreground">{value}</span>
        <span className="text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}
