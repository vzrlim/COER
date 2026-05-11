import { useState } from 'react';
import { Droplets, Lightbulb } from 'lucide-react';

interface ToggleSwitchProps {
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: () => void;
}

function ToggleSwitch({ label, icon, enabled, onToggle }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${enabled ? 'bg-primary/20' : 'bg-muted'}`}>
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-switch-background'
        }`}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export function QuickActions() {
  const [waterPump, setWaterPump] = useState(false);
  const [growLights, setGrowLights] = useState(true);

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6">
      <h3 className="mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <ToggleSwitch
          label="Manual Override: Water Pump"
          icon={<Droplets className="w-5 h-5 text-primary" />}
          enabled={waterPump}
          onToggle={() => setWaterPump(!waterPump)}
        />
        <ToggleSwitch
          label="Manual Override: Grow Lights"
          icon={<Lightbulb className="w-5 h-5 text-primary" />}
          enabled={growLights}
          onToggle={() => setGrowLights(!growLights)}
        />
      </div>
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Manual overrides will remain active until system automation is restored or conditions are manually reset.
        </p>
      </div>
    </div>
  );
}
