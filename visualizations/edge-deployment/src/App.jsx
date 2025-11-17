import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EdgeDeploymentNetwork } from './components/EdgeDeploymentNetwork';
import { ControlPanel } from '../../shared/src/ControlPanel';
import { InfoPanel } from '../../shared/src/InfoPanel';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const deviceInfo = {
    'cloud': {
      title: 'Cloud Server',
      content: 'Central cloud infrastructure hosting the full model. Handles model updates, monitoring, and coordination of edge devices.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'mobile': {
      title: 'Mobile Device',
      content: 'Smartphone or tablet running optimized model. Uses quantization and pruning for efficient inference on limited resources.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'iot': {
      title: 'IoT Device',
      content: 'Embedded device with minimal compute. Runs highly optimized models with hardware-specific accelerations.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
    'edge-server': {
      title: 'Edge Server',
      content: 'Local edge server with more compute power. Handles multiple inference requests and can run larger models.',
      citations: ['Reddi et al., MLSysBook.AI, 2024']
    },
  };

  const info = selectedDevice ? deviceInfo[selectedDevice] : null;

  return (
    <div className="w-full h-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 8, 12]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <EdgeDeploymentNetwork 
          isPlaying={isPlaying}
          speed={speed}
          onDeviceClick={setSelectedDevice}
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
            setSelectedDevice(null);
          }}
        />
      </div>

      {info && (
        <InfoPanel
          title={info.title}
          content={info.content}
          citations={info.citations}
          onClose={() => setSelectedDevice(null)}
        />
      )}

      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Edge AI Deployment</h2>
        <p className="text-sm text-gray-600 mb-2">
          Click on devices to learn more
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <div>Avg Latency: 45ms</div>
          <div>Bandwidth: 12.5 Mbps</div>
          <div>Active Devices: 8/10</div>
        </div>
      </div>
    </div>
  );
}

export default App;

