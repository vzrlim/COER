import { Activity, Database, Brain, Cpu, Circle } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  type: 'input' | 'reasoning' | 'execution';
  content: string;
}

const logEntries: LogEntry[] = [
  {
    timestamp: '2026-05-11 14:23:07',
    type: 'input',
    content: 'Weather API indicates rain. TNB at Peak. Canopy depth shows wilting.',
  },
  {
    timestamp: '2026-05-11 14:23:09',
    type: 'reasoning',
    content: 'Natural light insufficient, but electricity too expensive to turn on LEDs now. Wilting requires immediate water.',
  },
  {
    timestamp: '2026-05-11 14:23:11',
    type: 'execution',
    content: 'Triggering micro-irrigation pump for 5 mins. Deferring LED schedule to Off-Peak.',
  },
  {
    timestamp: '2026-05-11 12:45:32',
    type: 'input',
    content: 'Soil pH sensor reading 5.8. Optimal range: 6.0-6.5. Temperature stable at 21°C.',
  },
  {
    timestamp: '2026-05-11 12:45:34',
    type: 'reasoning',
    content: 'pH trending acidic. Nutrient solution adjustment required to prevent nutrient lockout. Current temperature supports metabolic activity.',
  },
  {
    timestamp: '2026-05-11 12:45:36',
    type: 'execution',
    content: 'Injecting pH buffer solution (15ml). Scheduling re-measurement in 30 minutes.',
  },
  {
    timestamp: '2026-05-11 09:15:18',
    type: 'input',
    content: 'Ambient humidity 52%. Target: 65-75%. Light sensor: 380 µmol/m²/s PAR.',
  },
  {
    timestamp: '2026-05-11 09:15:21',
    type: 'reasoning',
    content: 'Humidity below optimal range increases transpiration stress. Current light levels sufficient for photosynthesis. Prioritize humidification.',
  },
  {
    timestamp: '2026-05-11 09:15:23',
    type: 'execution',
    content: 'Activating ultrasonic humidifier. Target: 68%. Runtime: 20 minutes.',
  },
  {
    timestamp: '2026-05-11 07:02:45',
    type: 'input',
    content: 'DLI forecast: 42 mol/m²/day. Current reservoir level: 78%. Energy tariff: Off-Peak.',
  },
  {
    timestamp: '2026-05-11 07:02:47',
    type: 'reasoning',
    content: 'Excellent solar availability projected. Off-peak window allows for pre-cooling and water preparation. Reservoir adequate for 48h.',
  },
  {
    timestamp: '2026-05-11 07:02:49',
    type: 'execution',
    content: 'Pre-chilling nutrient solution to 18°C. Topping off reservoir (+15L). No immediate action required.',
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'input':
      return <Database className="w-4 h-4" />;
    case 'reasoning':
      return <Brain className="w-4 h-4" />;
    case 'execution':
      return <Cpu className="w-4 h-4" />;
    default:
      return <Circle className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'input':
      return 'text-primary bg-primary/10 border-primary/30';
    case 'reasoning':
      return 'text-[#b8a88a] bg-[#f5f0e6] border-[#d4c5a0]';
    case 'execution':
      return 'text-[#6b7b6e] bg-[#e8f0e9] border-[#9fb09f]';
    default:
      return 'text-muted-foreground bg-muted border-border';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'input':
      return 'SENSOR_INPUT';
    case 'reasoning':
      return 'LLM_REASONING';
    case 'execution':
      return 'SYSTEM_EXEC';
    default:
      return 'UNKNOWN';
  }
};

export function AgenticLogContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-6 h-6 text-primary" />
          <h2>Agentic Plant Doctor: System Activity Log</h2>
        </div>
        <p className="text-muted-foreground">
          Real-time autonomous decision-making powered by environmental sensors and LLM-based reasoning
        </p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-medium">System Status</span>
          </div>
          <div className="text-lg text-primary font-mono">ACTIVE</div>
        </div>
        <div className="bg-card border border-border rounded-xl shadow-sm p-4">
          <div className="text-sm text-muted-foreground mb-2">Decisions Today</div>
          <div className="text-lg font-mono">147</div>
        </div>
        <div className="bg-card border border-border rounded-xl shadow-sm p-4">
          <div className="text-sm text-muted-foreground mb-2">Interventions</div>
          <div className="text-lg font-mono">23</div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Activity Stream</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="font-mono">Live Monitoring</span>
          </div>
        </div>

        {/* Log Entries */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {logEntries.map((entry, index) => (
            <div key={index} className="relative pl-8 pb-4 border-l-2 border-border last:border-l-0 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-card border-2 border-primary"></div>

              {/* Entry content */}
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono border ${getTypeColor(entry.type)}`}>
                    {getTypeIcon(entry.type)}
                    {getTypeLabel(entry.type)}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{entry.timestamp}</span>
                </div>

                {/* Content */}
                <div className="text-sm font-mono leading-relaxed text-foreground bg-card/50 p-3 rounded border border-border/30">
                  {entry.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <h4 className="text-sm font-medium mb-3">Log Entry Types</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <div className="text-sm font-medium mb-1">Sensor Input</div>
              <div className="text-xs text-muted-foreground">Raw data from environmental sensors, weather APIs, and monitoring systems</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-[#b8a88a] mt-0.5" />
            <div>
              <div className="text-sm font-medium mb-1">LLM Reasoning</div>
              <div className="text-xs text-muted-foreground">AI-powered analysis and decision-making based on agronomic knowledge</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Cpu className="w-5 h-5 text-[#6b7b6e] mt-0.5" />
            <div>
              <div className="text-sm font-medium mb-1">System Execution</div>
              <div className="text-xs text-muted-foreground">Automated actions taken by the control system in response to decisions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
