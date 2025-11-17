import React, { useState, useEffect } from 'react';
import { TrainingSimulation } from './components/TrainingSimulation';
import { ControlPanel } from '../../shared/src/ControlPanel';
import { ParameterSlider } from '../../shared/src/ParameterSlider';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [learningRate, setLearningRate] = useState(0.001);
  const [batchSize, setBatchSize] = useState(32);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setEpoch(prev => prev + speed * 0.1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed]);

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      <div className="p-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-4">Training Process Simulator</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <ParameterSlider
            label="Learning Rate"
            value={learningRate}
            onChange={setLearningRate}
            min={0.0001}
            max={0.01}
            step={0.0001}
            description="Controls the step size during optimization"
          />
          <ParameterSlider
            label="Batch Size"
            value={batchSize}
            onChange={setBatchSize}
            min={8}
            max={128}
            step={8}
            description="Number of samples per gradient update"
          />
        </div>
        <ControlPanel
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          speed={speed}
          onSpeedChange={setSpeed}
          onReset={() => {
            setIsPlaying(false);
            setEpoch(0);
            setSpeed(1);
          }}
        />
      </div>
      <div className="flex-1">
        <TrainingSimulation
          isPlaying={isPlaying}
          speed={speed}
          learningRate={learningRate}
          batchSize={batchSize}
          epoch={epoch}
        />
      </div>
    </div>
  );
}

export default App;

