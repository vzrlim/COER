import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateMockData = () => {
  const data = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();

    data.push({
      id: `data-${23 - i}`,
      time: `${hour.toString().padStart(2, '0')}:00`,
      temperature: 18 + Math.sin(hour / 4) * 4 + Math.random() * 2,
      humidity: 60 + Math.cos(hour / 3) * 10 + Math.random() * 5,
    });
  }

  return data;
};

const data = generateMockData();

export function EnvironmentalChart() {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6">
      <h3 className="mb-4">24-Hour Environmental Monitoring</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(122, 155, 127, 0.2)" key="grid" />
          <XAxis
            dataKey="time"
            stroke="#6b7b6e"
            tick={{ fontFamily: 'Times New Roman, Times, serif' }}
            key="xaxis"
          />
          <YAxis
            stroke="#6b7b6e"
            tick={{ fontFamily: 'Times New Roman, Times, serif' }}
            key="yaxis"
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
            type="monotone"
            dataKey="temperature"
            stroke="#7a9b7f"
            strokeWidth={2}
            name="Temperature (°C)"
            dot={false}
            key="line-temperature"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#d4c5a0"
            strokeWidth={2}
            name="Humidity (%)"
            dot={false}
            key="line-humidity"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
