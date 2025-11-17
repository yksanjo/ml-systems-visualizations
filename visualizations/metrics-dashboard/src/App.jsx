import React, { useState, useEffect } from 'react';
import { MetricsDashboard } from './components/MetricsDashboard';

function App() {
  const [timeRange, setTimeRange] = useState('1h');

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Performance Metrics Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>
      </div>
      <MetricsDashboard timeRange={timeRange} />
    </div>
  );
}

export default App;

