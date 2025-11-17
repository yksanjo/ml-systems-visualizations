import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { SystemArchitecture3D } from './components/SystemArchitecture3D';
import { ControlPanel } from '../../shared/src/ControlPanel';
import { InfoPanel } from '../../shared/src/InfoPanel';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodeInfo = {
    'data-collection': {
      title: 'Data Collection',
      content: 'Ingests raw data from various sources including databases, APIs, and streaming services. Handles data validation and initial quality checks.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'preprocessing': {
      title: 'Data Preprocessing',
      content: 'Transforms raw data into a format suitable for machine learning. Includes cleaning, normalization, and feature extraction.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'feature-engineering': {
      title: 'Feature Engineering',
      content: 'Creates meaningful features from preprocessed data. Includes feature selection, transformation, and creation of derived features.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'training': {
      title: 'Model Training',
      content: 'Trains machine learning models using training data. Supports distributed training across multiple GPUs/TPUs.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'validation': {
      title: 'Model Validation',
      content: 'Evaluates model performance on validation set. Includes hyperparameter tuning and model selection.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'serving': {
      title: 'Model Serving',
      content: 'Deploys trained models for inference. Supports batch and real-time serving with load balancing and auto-scaling.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'edge-deployment': {
      title: 'Edge Deployment',
      content: 'Deploys optimized models to edge devices. Includes model quantization, pruning, and hardware-specific optimizations.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
  };

  const info = selectedNode ? nodeInfo[selectedNode] : null;

  return (
    <div className="w-full h-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <SystemArchitecture3D 
          isPlaying={isPlaying}
          speed={speed}
          onNodeClick={setSelectedNode}
        />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>

      <div className="absolute top-4 left-4">
        <ControlPanel
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          speed={speed}
          onSpeedChange={setSpeed}
          onReset={() => {
            setIsPlaying(false);
            setSpeed(1);
            setSelectedNode(null);
          }}
        />
      </div>

      {info && (
        <InfoPanel
          title={info.title}
          content={info.content}
          citations={info.citations}
          onClose={() => setSelectedNode(null)}
        />
      )}

      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">ML System Architecture</h2>
        <p className="text-sm text-gray-600">
          Click on nodes to learn more about each component
        </p>
      </div>
    </div>
  );
}

export default App;

