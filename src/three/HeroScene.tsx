import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider, type RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

const CHIPS = [
  { label: "React", color: "#61dafb" },
  { label: "TypeScript", color: "#3b82f6" },
  { label: "Node.js", color: "#8fce6a" },
  { label: "Python", color: "#f5c542" },
  { label: "AI Agents", color: "#ff7a45" },
  { label: "SAP Fiori", color: "#7fb2ff" },
  { label: "PostgreSQL", color: "#7dd3fc" },
  { label: "TensorFlow", color: "#ff9d5c" },
  { label: "OpenAI", color: "#e8e8e8" },
  { label: "Three.js", color: "#ffb088" },
  { label: "Docker", color: "#5ec8f2" },
  { label: "MongoDB", color: "#7ce38b" },
] as const;

function Chip({
  index,
  label,
  color,
  bounds,
  pointer,
}: {
  index: number;
  label: string;
  color: string;
  bounds: { x: number; y: number };
  pointer: React.MutableRefObject<THREE.Vector2>;
}) {
  const body = useRef<RapierRigidBody>(null);
  const start = useMemo(() => {
    const x = (Math.random() - 0.5) * bounds.x * 1.6;
    const y = 6 + index * 1.1;
    const z = (Math.random() - 0.5) * 1.2;
    const rot: [number, number, number] = [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ];
    return { position: [x, y, z] as [number, number, number], rotation: rot };
  }, [bounds.x, index]);

  useFrame((state) => {
    const rb = body.current;
    if (!rb) return;
    // pointer repel force
    const p = rb.translation();
    const dx = p.x - pointer.current.x;
    const dy = p.y - pointer.current.y;
    const distSq = dx * dx + dy * dy;
    const radius = 3.2;
    if (distSq < radius * radius) {
      const dist = Math.sqrt(distSq) || 0.001;
      const force = (1 - dist / radius) * 0.9;
      rb.applyImpulse(
        { x: (dx / dist) * force, y: (dy / dist) * force, z: 0.15 * force },
        true
      );
    }
    // gentle drift back toward center depth
    rb.applyImpulse({ x: 0, y: 0, z: -p.z * 0.002 }, true);
    void state;
  });

  return (
    <RigidBody
      ref={body}
      position={start.position}
      rotation={start.rotation}
      colliders="cuboid"
      restitution={0.2}
      friction={0.7}
      linearDamping={0.65}
      angularDamping={0.9}
    >
      <group>
        <RoundedBox args={[1.7, 0.62, 0.16]} radius={0.09} smoothness={2}>
          <meshStandardMaterial color="#181a21" metalness={0.2} roughness={0.5} emissive={color} emissiveIntensity={0.12} />
        </RoundedBox>
        <Text position={[0, 0, 0.09]} fontSize={0.16} color="#f4f3f1" anchorX="center" anchorY="middle" maxWidth={1.4}>
          {label}
        </Text>
      </group>
    </RigidBody>
  );
}

function Bounds({ x, y }: { x: number; y: number }) {
  const depth = 1.6;
  return (
    <>
      <RigidBody type="fixed" colliders={false} restitution={0.4}>
        <CuboidCollider args={[x, 0.2, depth]} position={[0, -y, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false} restitution={0.4}>
        <CuboidCollider args={[0.2, y + 4, depth]} position={[-x - 0.2, 0, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false} restitution={0.4}>
        <CuboidCollider args={[0.2, y + 4, depth]} position={[x + 0.2, 0, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false} restitution={0.3}>
        <CuboidCollider args={[x + 2, y + 4, 0.2]} position={[0, 0, -depth]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false} restitution={0.3}>
        <CuboidCollider args={[x + 2, y + 4, 0.2]} position={[0, 0, depth]} />
      </RigidBody>
    </>
  );
}

function PointerTracker({ pointer }: { pointer: React.MutableRefObject<THREE.Vector2> }) {
  const { viewport } = useThree();
  useFrame((state) => {
    const target = new THREE.Vector2(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2
    );
    pointer.current.lerp(target, 0.15);
  });
  return null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Scene({ chips }: { chips: readonly { label: string; color: string }[] }) {
  const pointer = useRef(new THREE.Vector2(0, 100));
  const { viewport } = useThree();
  // viewport.height is fixed by the camera's vertical FOV (independent of aspect ratio),
  // so only the horizontal bound needs to adapt — keeps the pile inside the frustum on
  // narrow viewports without spilling off-screen, and off the tagline text below it.
  const bounds = {
    x: clamp(viewport.width / 2 - 0.4, 2, 5.4),
    y: 2.5,
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffdcc2" />
      <pointLight position={[-5, -2, 3]} intensity={16} color="#ff7a45" />

      <Physics gravity={[0, -7.2, 0]}>
        <Bounds x={bounds.x} y={bounds.y} />
        {chips.map((chip, i) => (
          <Chip key={chip.label} index={i} label={chip.label} color={chip.color} bounds={bounds} pointer={pointer} />
        ))}
      </Physics>

      <PointerTracker pointer={pointer} />
    </>
  );
}

export default function HeroScene({ dense = true }: { dense?: boolean }) {
  const chips = dense ? CHIPS : CHIPS.slice(0, 6);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 9.5], fov: 42 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene chips={chips} />
    </Canvas>
  );
}
