import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const radius = 10 + Math.random() * 5; // create a sphere with radius 10 to 15
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#10b981"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const Background3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#8b5cf6" />
        
        {/* Floating geometric shapes to give it a techy feel */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[2, 1, -5]}>
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.3} transparent />
          </mesh>
        </Float>

        <Float speed={1.5} rotationIntensity={2} floatIntensity={1} position={[-3, -2, -8]}>
          <mesh>
            <icosahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#10b981" wireframe opacity={0.2} transparent />
          </mesh>
        </Float>
        
        {/* Dense starfield and dynamic particle swarm */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ParticleSwarm />
        
      </Canvas>
    </div>
  );
};

export default Background3D;
