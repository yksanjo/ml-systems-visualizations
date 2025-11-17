import React, { useState } from 'react';
import { MLOpsPipeline } from './components/MLOpsPipeline';
import { ControlPanel } from '../../shared/src/ControlPanel';
import { InfoPanel } from '../../shared/src/InfoPanel';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedStage, setSelectedStage] = useState(null);

  const stageInfo = {
    'source': {
      title: 'Source Control',
      content: 'Version control for code and model artifacts. Tracks changes, enables collaboration, and maintains history.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'build': {
      title: 'Build & Test',
      content: 'Automated building and testing of ML pipelines. Includes unit tests, integration tests, and data validation.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'train': {
      title: 'Training',
      content: 'Automated model training with hyperparameter tuning. Supports distributed training and experiment tracking.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'validate': {
      title: 'Validation',
      content: 'Model validation against test sets and business metrics. Checks for performance degradation and data drift.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'deploy': {
      title: 'Deployment',
      content: 'Automated deployment to staging and production. Supports canary deployments and A/B testing.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'monitor': {
      title: 'Monitoring',
      content: 'Continuous monitoring of model performance, data quality, and system health. Triggers alerts and retraining.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
  };

  const info = selectedStage ? stageInfo[selectedStage] : null;

  return (
    <div className="w-full h-full bg-gray-50 relative">
      <div className="absolute top-4 left-4 z-10">
        <ControlPanel
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          speed={speed}
          onSpeedChange={setSpeed}
          onReset={() => {
            setIsPlaying(false);
            setSpeed(1);
            setSelectedStage(null);
          }}
        />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">MLOps Pipeline</h2>
          <p className="text-sm text-gray-600 mb-2">
            Click on stages to learn more
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <div>Status: {isPlaying ? 'Running' : 'Stopped'}</div>
            <div>Last Run: 2 hours ago</div>
            <div>Success Rate: 98.5%</div>
          </div>
        </div>
      </div>

      <MLOpsPipeline
        isPlaying={isPlaying}
        speed={speed}
        onStageClick={setSelectedStage}
      />

      {info && (
        <InfoPanel
          title={info.title}
          content={info.content}
          citations={info.citations}
          onClose={() => setSelectedStage(null)}
        />
      )}
    </div>
  );
}

export default App;

