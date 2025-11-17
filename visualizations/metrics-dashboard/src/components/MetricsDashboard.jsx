import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Generate sample data
function generateData(timeRange) {
  const data = [];
  const now = Date.now();
  const intervals = timeRange === '1h' ? 12 : timeRange === '6h' ? 36 : timeRange === '24h' ? 48 : 168;
  const intervalMs = timeRange === '1h' ? 300000 : timeRange === '6h' ? 600000 : timeRange === '24h' ? 1800000 : 3600000;

  for (let i = intervals; i >= 0; i--) {
    const timestamp = now - i * intervalMs;
    const time = new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    data.push({
      time,
      throughput: 1000 + Math.random() * 500,
      latency: 20 + Math.random() * 30,
      cpu: 40 + Math.random() * 40,
      memory: 50 + Math.random() * 30,
      gpu: 60 + Math.random() * 30,
      cost: 0.5 + Math.random() * 0.5,
    });
  }
  
  return data;
}

export function MetricsDashboard({ timeRange }) {
  const data = useMemo(() => generateData(timeRange), [timeRange]);

  const avgThroughput = useMemo(() => 
    data.reduce((sum, d) => sum + d.throughput, 0) / data.length,
    [data]
  );

  const avgLatency = useMemo(() => 
    data.reduce((sum, d) => sum + d.latency, 0) / data.length,
    [data]
  );

  const totalCost = useMemo(() => 
    data.reduce((sum, d) => sum + d.cost, 0),
    [data]
  );

  const latencyData = data.map(d => ({
    time: d.time,
    p50: d.latency,
    p95: d.latency * 1.5,
    p99: d.latency * 2,
  }));

  const resourceData = [
    { name: 'CPU', usage: data[data.length - 1]?.cpu || 0, color: '#3B82F6' },
    { name: 'Memory', usage: data[data.length - 1]?.memory || 0, color: '#10B981' },
    { name: 'GPU', usage: data[data.length - 1]?.gpu || 0, color: '#8B5CF6' },
  ];

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {/* Summary Cards */}
      <div className="col-span-2 grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Avg Throughput</div>
          <div className="text-2xl font-bold text-blue-600">{avgThroughput.toFixed(0)} req/s</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Avg Latency</div>
          <div className="text-2xl font-bold text-green-600">{avgLatency.toFixed(1)} ms</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Cost</div>
          <div className="text-2xl font-bold text-purple-600">${totalCost.toFixed(2)}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Uptime</div>
          <div className="text-2xl font-bold text-orange-600">99.9%</div>
        </div>
      </div>

      {/* Throughput Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Throughput (requests/sec)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="throughput" stroke="#3B82F6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Latency Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Latency (ms)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={latencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="p50" stroke="#10B981" strokeWidth={2} dot={false} name="P50" />
            <Line type="monotone" dataKey="p95" stroke="#F59E0B" strokeWidth={2} dot={false} name="P95" />
            <Line type="monotone" dataKey="p99" stroke="#EF4444" strokeWidth={2} dot={false} name="P99" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Resource Utilization */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Resource Utilization (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resourceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="usage">
              {resourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Analysis */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Cost Over Time ($)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cost" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

