import { Thermometer, Droplets, FlaskConical, Waves } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { EnvironmentalChart } from './EnvironmentalChart';
import { QuickActions } from './QuickActions';
import { SystemHealthStrip } from './SystemHealthStrip';

export function OverviewContent() {
  return (
    <div className="space-y-6">
      {/* System & API Health Strip */}
      <SystemHealthStrip />
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Ambient Temperature"
          value="21.5"
          unit="°C"
          icon={<Thermometer className="w-6 h-6 text-primary" />}
          trend="up"
          trendValue="0.8°C"
        />
        <MetricCard
          title="Humidity"
          value="68"
          unit="%"
          icon={<Droplets className="w-6 h-6 text-primary" />}
          trend="stable"
          trendValue="0.2%"
        />
        <MetricCard
          title="Nutrient pH"
          value="6.2"
          unit="pH"
          icon={<FlaskConical className="w-6 h-6 text-primary" />}
          trend="down"
          trendValue="0.1"
        />
        <MetricCard
          title="Water Reservoir Level"
          value="87"
          unit="%"
          icon={<Waves className="w-6 h-6 text-primary" />}
          trend="down"
          trendValue="3%"
        />
      </div>

      {/* Chart and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnvironmentalChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
