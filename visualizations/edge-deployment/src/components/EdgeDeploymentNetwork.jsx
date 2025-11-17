import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Device({ position, color, label, id, onClick, isActive, pulse, type }) {
  const meshRef = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      if (pulse) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
      }
    }
  });

  const geometry = type === 'cloud' 
    ? new THREE.BoxGeometry(1.5, 1.5, 1.5)
    : type === 'mobile'
    ? new THREE.BoxGeometry(0.6, 1, 0.1)
    : new THREE.BoxGeometry(0.8, 0.8, 0.8);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        geometry={geometry}
      >
        <meshStandardMaterial
          color={isActive ? '#EF4444' : color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <planeGeometry args={[2, 0.3]} />
        <meshBasicMaterial color="#000" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function Connection({ start, end, color, animated, speed = 1 }) {
  const points = React.useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 2,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end),
    ]);
    return curve.getPoints(50);
  }, [start, end]);

  const lineRef = useRef();

  useFrame((state) => {
    if (animated && lineRef.current) {
      lineRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * speed * 2) * 0.3;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.5} />
    </line>
  );
}

function DataPacket({ start, end, color, speed, delay }) {
  const meshRef = useRef();
  const progressRef = useRef(delay);

  useFrame((state, delta) => {
    if (meshRef.current) {
      progressRef.current += delta * speed;
      if (progressRef.current > 1) progressRef.current = 0;

      const t = progressRef.current;
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 2;
      const z = start[2] + (end[2] - start[2]) * t;

      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={meshRef} position={start}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

export function EdgeDeploymentNetwork({ isPlaying, speed, onDeviceClick }) {
  const [selectedDevice, setSelectedDevice] = React.useState(null);

  const devices = React.useMemo(() => [
    { id: 'cloud', position: [0, 3, 0], color: '#8B5CF6', label: 'Cloud', type: 'cloud' },
    { id: 'edge-server', position: [-3, 0, 2], color: '#06B6D4', label: 'Edge Server', type: 'edge' },
    { id: 'mobile', position: [3, 0, -2], color: '#FBBF24', label: 'Mobile', type: 'mobile' },
    { id: 'iot', position: [-2, -1, -3], color: '#F97316', label: 'IoT', type: 'iot' },
    { id: 'mobile', position: [2, -1, 3], color: '#FBBF24', label: 'Mobile', type: 'mobile' },
    { id: 'iot', position: [-4, -1, -1], color: '#F97316', label: 'IoT', type: 'iot' },
  ], []);

  const connections = React.useMemo(() => [
    { start: [0, 3, 0], end: [-3, 0, 2], color: '#8B5CF6' },
    { start: [0, 3, 0], end: [3, 0, -2], color: '#8B5CF6' },
    { start: [0, 3, 0], end: [-2, -1, -3], color: '#8B5CF6' },
    { start: [-3, 0, 2], end: [2, -1, 3], color: '#06B6D4' },
    { start: [-3, 0, 2], end: [-4, -1, -1], color: '#06B6D4' },
  ], []);

  const handleDeviceClick = (id) => {
    setSelectedDevice(id);
    onDeviceClick(id);
  };

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Devices */}
      {devices.map((device, idx) => (
        <Device
          key={`${device.id}-${idx}`}
          position={device.position}
          color={device.color}
          label={device.label}
          id={device.id}
          onClick={handleDeviceClick}
          isActive={selectedDevice === device.id}
          pulse={isPlaying}
          type={device.type}
        />
      ))}

      {/* Connections */}
      {connections.map((conn, idx) => (
        <Connection
          key={idx}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          animated={isPlaying}
          speed={speed}
        />
      ))}

      {/* Data packets */}
      {isPlaying && connections.map((conn, idx) => (
        <DataPacket
          key={`packet-${idx}`}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          speed={speed * 0.3}
          delay={idx * 0.4}
        />
      ))}
    </group>
  );
}

