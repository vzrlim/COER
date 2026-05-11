import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Droplets, Activity, Thermometer, Wifi, WifiOff, Battery, BatteryWarning } from 'lucide-react';
import { GaugeChart } from './GaugeChart';

const generateTrendData = (zone: string) => {
  const data = [];
  const baseTemp = zone === 'A' ? 21 : zone === 'B' ? 22 : 20;
  const baseHumidity = zone === 'A' ? 68 : zone === 'B' ? 65 : 70;
  const baseVPD = zone === 'A' ? 0.9 : zone === 'B' ? 1.1 : 0.8;

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));

    data.push({
      id: `${zone}-day-${i}`,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temperature: baseTemp + Math.sin(i * 0.5) * 2 + Math.random() * 1,
      humidity: baseHumidity + Math.cos(i * 0.7) * 5 + Math.random() * 3,
      vpd: baseVPD + Math.sin(i * 0.3) * 0.3 + Math.random() * 0.1,
    });
  }

  return data;
};

const sensorData = [
  { id: 'esp32-1', name: 'ESP32 Node 1', type: 'Controller', zone: 'Zone A', status: 'online', battery: 95, signal: 'Strong' },
  { id: 'dht11-1', name: 'DHT11 Sensor', type: 'Temp/Humidity', zone: 'Zone A', status: 'online', battery: 78, signal: 'Good' },
  { id: 'esp32-2', name: 'ESP32 Node 2', type: 'Controller', zone: 'Zone B', status: 'online', battery: 88, signal: 'Strong' },
  { id: 'soil-1', name: 'Soil Moisture Probe', type: 'Moisture', zone: 'Zone B', status: 'online', battery: 62, signal: 'Fair' },
  { id: 'esp32-3', name: 'ESP32 Node 3', type: 'Controller', zone: 'Zone C', status: 'offline', battery: 12, signal: 'Weak' },
  { id: 'ph-sensor', name: 'pH Electrode', type: 'Chemical', zone: 'All Zones', status: 'online', battery: null, signal: 'Strong' },
  { id: 'ec-sensor', name: 'EC Meter', type: 'Conductivity', zone: 'All Zones', status: 'online', battery: null, signal: 'Good' },
  { id: 'dht22-1', name: 'DHT22 Sensor', type: 'Temp/Humidity', zone: 'Zone C', status: 'online', battery: 45, signal: 'Fair' },
];

export function ClimateContent() {
  const [activeZone, setActiveZone] = useState('A');
  const trendData = generateTrendData(activeZone);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <h2 className="mb-2">Climate & Soil: Technical Monitoring</h2>
        <p className="text-muted-foreground">
          Advanced environmental metrics and sensor diagnostics for precision agriculture
        </p>
      </div>

      {/* Gauge Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GaugeChart
          title="Vapor Pressure Deficit"
          value={0.92}
          min={0}
          max={2.5}
          unit="kPa"
          optimalMin={0.8}
          optimalMax={1.2}
          icon={<Droplets className="w-5 h-5 text-primary" />}
        />
        <GaugeChart
          title="Nutrient EC"
          value={1.8}
          min={0}
          max={3}
          unit="mS/cm"
          optimalMin={1.5}
          optimalMax={2.2}
          icon={<Activity className="w-5 h-5 text-primary" />}
        />
        <GaugeChart
          title="Root Zone Temperature"
          value={19.5}
          min={10}
          max={30}
          unit="°C"
          optimalMin={18}
          optimalMax={22}
          icon={<Thermometer className="w-5 h-5 text-primary" />}
        />
      </div>

      {/* Micro-Climate Trend Graph */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>7-Day Micro-Climate Trends</h3>
          <div className="flex gap-2">
            {['A', 'B', 'C'].map((zone) => (
              <button
                key={zone}
                onClick={() => setActiveZone(zone)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeZone === zone
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Zone {zone}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(122, 155, 127, 0.2)" key="grid" />
            <XAxis
              dataKey="date"
              stroke="#6b7b6e"
              tick={{ fontFamily: 'Times New Roman, Times, serif', fontSize: 12 }}
              key="xaxis"
            />
            <YAxis
              yAxisId="left"
              stroke="#6b7b6e"
              tick={{ fontFamily: 'Times New Roman, Times, serif', fontSize: 12 }}
              key="yaxis-left"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6b7b6e"
              tick={{ fontFamily: 'Times New Roman, Times, serif', fontSize: 12 }}
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#7a9b7f"
              strokeWidth={2}
              name="Temperature (°C)"
              dot={{ r: 4 }}
              key="line-temp"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#d4c5a0"
              strokeWidth={2}
              name="Humidity (%)"
              dot={{ r: 4 }}
              key="line-humidity"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="vpd"
              stroke="#b8a88a"
              strokeWidth={2}
              name="VPD (kPa)"
              dot={{ r: 4 }}
              key="line-vpd"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sensor Health Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <h3 className="mb-4">Sensor Health & Connectivity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Device ID</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Type</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Zone</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Battery</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Signal</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((sensor) => {
                const isOnline = sensor.status === 'online';
                const batteryLow = sensor.battery !== null && sensor.battery < 20;

                return (
                  <tr key={sensor.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm">{sensor.name}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{sensor.type}</td>
                    <td className="py-3 px-4 text-muted-foreground">{sensor.zone}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                        isOnline
                          ? 'bg-primary/10 text-primary'
                          : 'bg-[#fef5f5] text-[#a85858]'
                      }`}>
                        {isOnline ? (
                          <><Wifi className="w-3 h-3" /> Online</>
                        ) : (
                          <><WifiOff className="w-3 h-3" /> Offline</>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {sensor.battery !== null ? (
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                          batteryLow
                            ? 'bg-[#fef5f5] text-[#a85858]'
                            : 'bg-muted text-foreground'
                        }`}>
                          {batteryLow ? (
                            <><BatteryWarning className="w-3 h-3" /> {sensor.battery}%</>
                          ) : (
                            <><Battery className="w-3 h-3" /> {sensor.battery}%</>
                          )}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Wired</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-muted-foreground">{sensor.signal}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> ESP32 Node 3 offline - battery critically low. Recommend immediate replacement or charging to maintain Zone C monitoring coverage.
          </p>
        </div>
      </div>
    </div>
  );
}
