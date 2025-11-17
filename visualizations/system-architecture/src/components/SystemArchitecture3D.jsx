import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Node component
function Node({ position, color, label, id, onClick, isActive, pulse }) {
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

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={isActive ? '#EF4444' : color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <planeGeometry args={[2, 0.3]} />
        <meshBasicMaterial color="#000" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// Connection line component
function Connection({ start, end, color, animated, speed = 1 }) {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 1,
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

// Data flow particle
function DataParticle({ start, end, color, speed, delay }) {
  const meshRef = useRef();
  const progressRef = useRef(delay);

  useFrame((state, delta) => {
    if (meshRef.current) {
      progressRef.current += delta * speed;
      if (progressRef.current > 1) progressRef.current = 0;

      const t = progressRef.current;
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 1;
      const z = start[2] + (end[2] - start[2]) * t;

      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={meshRef} position={start}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

export function SystemArchitecture3D({ isPlaying, speed, onNodeClick }) {
  const [selectedNode, setSelectedNode] = React.useState(null);

  // Node positions and definitions
  const nodes = useMemo(() => [
    { id: 'data-collection', position: [-4, 0, -2], color: '#3B82F6', label: 'Data Collection' },
    { id: 'preprocessing', position: [-2, 0, -2], color: '#3B82F6', label: 'Preprocessing' },
    { id: 'feature-engineering', position: [0, 0, -2], color: '#3B82F6', label: 'Feature Eng' },
    { id: 'training', position: [-2, 2, 0], color: '#10B981', label: 'Training' },
    { id: 'validation', position: [0, 2, 0], color: '#10B981', label: 'Validation' },
    { id: 'serving', position: [2, 0, 2], color: '#8B5CF6', label: 'Serving' },
    { id: 'edge-deployment', position: [4, 0, 2], color: '#FBBF24', label: 'Edge' },
  ], []);

  // Connections
  const connections = useMemo(() => [
    { start: [-4, 0, -2], end: [-2, 0, -2], color: '#3B82F6' },
    { start: [-2, 0, -2], end: [0, 0, -2], color: '#3B82F6' },
    { start: [0, 0, -2], end: [-2, 2, 0], color: '#10B981' },
    { start: [-2, 2, 0], end: [0, 2, 0], color: '#10B981' },
    { start: [0, 2, 0], end: [2, 0, 2], color: '#8B5CF6' },
    { start: [2, 0, 2], end: [4, 0, 2], color: '#FBBF24' },
  ], []);

  const handleNodeClick = (id) => {
    setSelectedNode(id);
    onNodeClick(id);
  };

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Nodes */}
      {nodes.map((node) => (
        <Node
          key={node.id}
          position={node.position}
          color={node.color}
          label={node.label}
          id={node.id}
          onClick={handleNodeClick}
          isActive={selectedNode === node.id}
          pulse={isPlaying}
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

      {/* Data particles */}
      {isPlaying && connections.map((conn, idx) => (
        <DataParticle
          key={`particle-${idx}`}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          speed={speed * 0.5}
          delay={idx * 0.3}
        />
      ))}
    </group>
  );
}

