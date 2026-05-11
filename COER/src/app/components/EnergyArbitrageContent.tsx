import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, Sun, AlertTriangle, CheckCircle } from 'lucide-react';

const generateEnergyData = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const isPeak = (i >= 8 && i < 12) || (i >= 17 && i < 22);
    hours.push({
      id: `hour-${i}`,
      time: `${i.toString().padStart(2, '0')}:00`,
      tariff: isPeak ? 0.57 : 0.22,
      sunlight: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 45 + Math.random() * 5),
      isPeak,
    });
  }
  return hours;
};

const energyData = generateEnergyData();

const scheduleData = [
  {
    time: '08:30',
    weather: 'Partly Cloudy',
    tariff: 'Peak (High Cost)',
    decision: 'DEFER: Irrigation pumps to 23:00',
    type: 'defer',
  },
  {
    time: '11:00',
    weather: 'Sunny',
    tariff: 'Peak (High Cost)',
    decision: 'OPTIMIZE: Use solar for climate control',
    type: 'optimize',
  },
  {
    time: '14:00',
    weather: 'Cloudy',
    tariff: 'Peak (High Cost)',
    decision: 'ACTION: Defer LEDs to 22:00',
    type: 'defer',
  },
  {
    time: '18:30',
    weather: 'Clear',
    tariff: 'Peak (High Cost)',
    decision: 'REDUCE: Dim supplemental lighting 40%',
    type: 'reduce',
  },
  {
    time: '22:00',
    weather: 'Clear',
    tariff: 'Off-Peak (Low Cost)',
    decision: 'EXECUTE: Run deferred operations',
    type: 'execute',
  },
  {
    time: '23:30',
    weather: 'Clear',
    tariff: 'Off-Peak (Low Cost)',
    decision: 'EXECUTE: Full LED grow cycle',
    type: 'execute',
  },
  {
    time: '02:00',
    weather: 'Clear',
    tariff: 'Off-Peak (Low Cost)',
    decision: 'EXECUTE: Water heating & filtration',
    type: 'execute',
  },
];

export function EnergyArbitrageContent() {
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3>Projected Savings</h3>
          </div>
          <div className="text-3xl font-semibold text-primary">RM 127.40</div>
          <p className="text-sm text-muted-foreground mt-1">Per week via smart scheduling</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sun className="w-5 h-5 text-primary" />
            </div>
            <h3>Solar Availability</h3>
          </div>
          <div className="text-3xl font-semibold text-foreground">6.8 hrs</div>
          <p className="text-sm text-muted-foreground mt-1">Peak DLI window today</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            <h3>Peak Avoidance</h3>
          </div>
          <div className="text-3xl font-semibold text-foreground">73%</div>
          <p className="text-sm text-muted-foreground mt-1">Operations shifted off-peak</p>
        </div>
      </div>

      {/* Dual-Axis Chart */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <h3 className="mb-4">24-Hour Tariff & Solar Forecast</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(122, 155, 127, 0.2)" key="grid" />
            <XAxis
              dataKey="time"
              stroke="#6b7b6e"
              tick={{ fontFamily: 'Times New Roman, Times, serif' }}
              key="xaxis"
            />
            <YAxis
              yAxisId="left"
              stroke="#6b7b6e"
              tick={{ fontFamily: 'Times New Roman, Times, serif' }}
              label={{ value: 'Tariff (RM/kWh)', angle: -90, position: 'insideLeft', style: { fontFamily: 'Times New Roman, Times, serif' } }}
              key="yaxis-left"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6b7b6e"
              tick={{ fontFamily: 'Times New Roman, Times, serif' }}
              label={{ value: 'DLI (mol/m²/day)', angle: 90, position: 'insideRight', style: { fontFamily: 'Times New Roman, Times, serif' } }}
              key="yaxis-right"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(122, 155, 127, 0.3)',
                borderRadius: '0.75rem',
                fontFamily: 'Times New Roman, Times, serif'
              }}
              key="tooltip"
            />
            <Legend
              wrapperStyle={{ fontFamily: 'Times New Roman, Times, serif' }}
              key="legend"
            />
            <Bar
              yAxisId="left"
              dataKey="tariff"
              fill="#e8b86d"
              fillOpacity={0.6}
              name="TNB Tariff (RM/kWh)"
              key="bar-tariff"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sunlight"
              stroke="#7a9b7f"
              strokeWidth={3}
              name="Predicted Sunlight (DLI)"
              dot={false}
              key="line-sunlight"
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#e8b86d] opacity-60 rounded"></div>
            <span className="text-muted-foreground">Peak Tariff Period (RM 0.57/kWh)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#e8b86d] opacity-30 rounded"></div>
            <span className="text-muted-foreground">Off-Peak Tariff (RM 0.22/kWh)</span>
          </div>
        </div>
      </div>

      {/* Agentic Schedule Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <h3>Agentic Schedule</h3>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
            LLM-Optimized
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Time</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Predicted Weather</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Tariff Rate</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Agent Decision</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, index) => {
                const isPeak = row.tariff.includes('Peak');
                const isExecute = row.type === 'execute';

                return (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-medium">{row.time}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.weather}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm ${
                        isPeak
                          ? 'bg-[#f5e6d3] text-[#8b6914]'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {isPeak && <AlertTriangle className="w-3 h-3" />}
                        {row.tariff}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-2 ${
                        isExecute ? 'text-primary' : 'text-foreground'
                      }`}>
                        {isExecute && <CheckCircle className="w-4 h-4" />}
                        {row.decision}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Agent Logic:</strong> The LLM continuously analyzes weather forecasts, solar irradiance predictions, and TNB tariff schedules to dynamically shift energy-intensive operations to off-peak windows, maximizing cost efficiency while maintaining optimal growing conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
