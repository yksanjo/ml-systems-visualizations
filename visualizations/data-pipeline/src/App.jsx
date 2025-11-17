import React, { useState } from 'react';
import { DataPipeline2D } from './components/DataPipeline2D';
import { ControlPanel } from '../../shared/src/ControlPanel';
import { InfoPanel } from '../../shared/src/InfoPanel';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [timePosition, setTimePosition] = useState(0);

  const nodeInfo = {
    'ingestion': {
      title: 'Data Ingestion',
      content: 'Collects data from multiple sources including databases, APIs, files, and streaming services. Handles initial validation and schema checking.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'preprocessing': {
      title: 'Data Preprocessing',
      content: 'Cleans and transforms raw data: handles missing values, removes duplicates, normalizes formats, and applies data quality rules.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'validation': {
      title: 'Data Validation',
      content: 'Validates data quality, checks for anomalies, enforces business rules, and flags data quality issues for review.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'feature-store': {
      title: 'Feature Store',
      content: 'Stores processed features for reuse across training and inference. Enables feature versioning and consistency.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'training-data': {
      title: 'Training Data',
      content: 'Prepared dataset for model training with proper splits, balancing, and augmentation applied.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
  };

  const info = selectedNode ? nodeInfo[selectedNode] : null;

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
            setTimePosition(0);
            setSelectedNode(null);
          }}
        />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Data Pipeline Flow</h2>
          <p className="text-sm text-gray-600 mb-2">
            Click on nodes to learn more
          </p>
          <div className="text-xs text-gray-500">
            Data Quality: 98.5% | Throughput: 1.2M records/min
          </div>
        </div>
      </div>

      <DataPipeline2D
        isPlaying={isPlaying}
        speed={speed}
        onNodeClick={setSelectedNode}
        timePosition={timePosition}
        onTimeChange={setTimePosition}
      />

      {info && (
        <InfoPanel
          title={info.title}
          content={info.content}
          citations={info.citations}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}

export default App;

