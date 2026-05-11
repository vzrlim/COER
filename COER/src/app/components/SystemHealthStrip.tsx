import { Circle } from 'lucide-react';

interface HealthMetric {
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'error';
}

const metrics: HealthMetric[] = [
  {
    label: 'Active Farms',
    value: '12 Nodes',
    status: 'healthy',
  },
  {
    label: 'Edge GPU VRAM',
    value: '1.2GB / 4.0GB',
    status: 'healthy',
  },
  {
    label: 'Depth Anything V2',
    value: 'Online (32ms ping)',
    status: 'healthy',
  },
  {
    label: 'Claude 3.5 API Tokens',
    value: '12k used today',
    status: 'healthy',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'bg-primary';
    case 'warning':
      return 'bg-[#e8b86d]';
    case 'error':
      return 'bg-[#c77d7d]';
    default:
      return 'bg-muted-foreground';
  }
};

export function SystemHealthStrip() {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground font-medium mr-2">System & API Health:</span>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted/30 rounded-lg border border-border/50"
          >
            <Circle className={`w-2 h-2 ${getStatusColor(metric.status)} rounded-full`} fill="currentColor" />
            <span className="text-xs text-muted-foreground">{metric.label}:</span>
            <span className="text-xs font-medium text-foreground">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
