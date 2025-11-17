import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Generate loss curve data
function generateLossData(epoch, learningRate, batchSize) {
  const data = [];
  const baseLoss = 2.5;
  const noise = 0.1;
  
  for (let i = 0; i <= Math.floor(epoch * 10); i++) {
    const e = i / 10;
    // Simulate loss decreasing with some noise
    const loss = baseLoss * Math.exp(-e * learningRate * 100) + 
                 (Math.random() - 0.5) * noise * Math.exp(-e * 0.5);
    const valLoss = loss * 1.1 + (Math.random() - 0.5) * noise;
    
    data.push({
      epoch: e.toFixed(1),
      trainLoss: Math.max(0, loss),
      valLoss: Math.max(0, valLoss),
    });
  }
  
  return data;
}

// Model architecture visualization
function ModelArchitecture({ layers }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Model Architecture</h3>
      <div className="flex flex-col items-center gap-2">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className="w-64 py-3 px-4 bg-blue-100 border-2 border-blue-300 rounded text-center"
            style={{
              opacity: idx <= Math.floor(layers.length * 0.7) ? 1 : 0.5,
            }}
          >
            <div className="font-semibold">{layer.name}</div>
            <div className="text-sm text-gray-600">{layer.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrainingSimulation({ isPlaying, speed, learningRate, batchSize, epoch }) {
  const [checkpoints, setCheckpoints] = useState([]);
  
  const lossData = useMemo(() => 
    generateLossData(epoch, learningRate, batchSize),
    [epoch, learningRate, batchSize]
  );

  const layers = [
    { name: 'Input Layer', size: '784 neurons' },
    { name: 'Dense Layer 1', size: '128 neurons' },
    { name: 'Dense Layer 2', size: '64 neurons' },
    { name: 'Dense Layer 3', size: '32 neurons' },
    { name: 'Output Layer', size: '10 neurons' },
  ];

  useEffect(() => {
    if (isPlaying && Math.floor(epoch) % 5 === 0 && epoch > 0) {
      const checkpoint = {
        epoch: Math.floor(epoch),
        loss: lossData[lossData.length - 1]?.trainLoss || 0,
        timestamp: new Date().toLocaleTimeString(),
      };
      setCheckpoints(prev => {
        if (!prev.find(c => c.epoch === checkpoint.epoch)) {
          return [...prev, checkpoint];
        }
        return prev;
      });
    }
  }, [epoch, isPlaying, lossData]);

  const currentLoss = lossData[lossData.length - 1]?.trainLoss || 0;
  const currentValLoss = lossData[lossData.length - 1]?.valLoss || 0;

  return (
    <div className="h-full p-4 grid grid-cols-2 gap-4">
      {/* Loss Curve */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Training Progress</h3>
        <div className="mb-4">
          <div className="text-sm text-gray-600">
            Epoch: <span className="font-semibold">{epoch.toFixed(1)}</span>
          </div>
          <div className="text-sm text-gray-600">
            Train Loss: <span className="font-semibold text-blue-600">{currentLoss.toFixed(4)}</span>
          </div>
          <div className="text-sm text-gray-600">
            Val Loss: <span className="font-semibold text-green-600">{currentValLoss.toFixed(4)}</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lossData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis domain={[0, 3]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="trainLoss" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
              name="Training Loss"
            />
            <Line 
              type="monotone" 
              dataKey="valLoss" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
              name="Validation Loss"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Model Architecture */}
      <div>
        <ModelArchitecture layers={layers} />
        
        {/* Checkpoints */}
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Model Checkpoints</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {checkpoints.length === 0 ? (
              <p className="text-sm text-gray-500">No checkpoints saved yet</p>
            ) : (
              checkpoints.map((cp, idx) => (
                <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                  <div className="font-semibold">Epoch {cp.epoch}</div>
                  <div className="text-gray-600">Loss: {cp.loss.toFixed(4)}</div>
                  <div className="text-xs text-gray-500">{cp.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

