import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function useAccent() {
  return useMemo(
    () => ({
      cyan: new THREE.Color("#7fd6e8"),
      gold: new THREE.Color("#e2c17a"),
      paper: new THREE.Color("#cfd8e3"),
      deep: new THREE.Color("#1b2434"),
    }),
    [],
  );
}

function DocumentStack({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const c = useAccent();
  const sheets = [0, 1, 2, 3, 4];

  useFrame((state) => {
    if (!group.current || reduced) return;
    group.current.rotation.y = 0.35 + Math.sin(state.clock.elapsedTime * 0.25) * 0.25;
  });


  return (
    <group ref={group} rotation={[-0.95, 0.35, 0.12]} scale={1.2}>
      {sheets.map((i) => (
        <Float
          key={i}
          speed={reduced ? 0 : 1.1 + i * 0.12}
          rotationIntensity={reduced ? 0 : 0.12}
          floatIntensity={reduced ? 0 : 0.35}
        >
          <mesh position={[(i - 2) * 0.06, (i - 2) * 0.26, (i - 2) * 0.04]} castShadow>
            <boxGeometry args={[1.5, 0.02, 2.05]} />
            <meshStandardMaterial
              color={c.paper}
              metalness={0.25}
              roughness={0.55}
              emissive={c.deep}
              emissiveIntensity={0.4}
            />
          </mesh>
          <mesh
            position={[(i - 2) * 0.06, (i - 2) * 0.26 + 0.013, (i - 2) * 0.04]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[1.2, 1.7]} />
            <meshBasicMaterial
              color={i === 2 ? c.cyan : c.deep}
              transparent
              opacity={i === 2 ? 0.18 : 0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function NeuralNodes({ count, reduced }: { count: number; reduced: boolean }) {
  const c = useAccent();
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const out: { pos: THREE.Vector3; scale: number; gold: boolean }[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.6 + (i % 3) * 0.22;
      out.push({
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.7,
          r * Math.sin(phi) * Math.sin(theta),
        ),
        scale: 0.028 + (i % 4) * 0.008,
        gold: i % 7 === 0,
      });
    }
    return out;
  }, [count]);

  const edges = useMemo(() => {
    const out: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!a) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        if (!b) continue;
        if (a.pos.distanceTo(b.pos) < 1.5 && out.length < count * 1.4) {
          out.push([a.pos, b.pos]);
        }
      }
    }
    return out;
  }, [nodes, count]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.scale, 10, 10]} />
          <meshBasicMaterial color={n.gold ? c.gold : c.cyan} />
        </mesh>
      ))}
      {edges.map((e, i) => (
        <Line
          key={i}
          points={[e[0], e[1]]}
          color="#5f93a8"
          transparent
          opacity={0.22}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function ProcessingRings({ reduced }: { reduced: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useAccent();

  useFrame((_, delta) => {
    if (reduced) return;
    if (a.current) a.current.rotation.z += delta * 0.28;
    if (b.current) b.current.rotation.z -= delta * 0.18;
  });

  return (
    <group>
      <mesh ref={a} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[2.05, 0.006, 8, 128]} />
        <meshBasicMaterial color={c.cyan} transparent opacity={0.5} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.7, 0.4, 0]}>
        <torusGeometry args={[2.5, 0.004, 8, 128]} />
        <meshBasicMaterial color={c.gold} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#8fb6c9" transparent opacity={0.55} />
    </points>
  );
}

function MouseRig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reduced) return;
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.55 + 0.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({
  quality = "high",
  reducedMotion = false,
  offsetX = 0,
}: {
  quality?: "high" | "low";
  reducedMotion?: boolean;
  /** Horizontal shift of the whole composition, so hero copy stays readable. */
  offsetX?: number;
}) {
  const low = quality === "low";
  return (
    <Canvas
      dpr={[1, low ? 1.2 : 1.8]}
      camera={{ position: [0, 0.2, 7], fov: 45 }}
      gl={{ antialias: !low, powerPreference: "high-performance" }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <color attach="background" args={["#14181f"]} />
      <fog attach="fog" args={["#14181f", 7, 16]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} color="#cfe8f2" />
      <pointLight position={[-4, -2, 2]} intensity={18} color="#4fa3c7" distance={12} />
      <pointLight position={[3, 3, -3]} intensity={10} color="#e2c17a" distance={12} />
      <group position={[offsetX, 0, 0]}>
        <DocumentStack reduced={reducedMotion} />
        <NeuralNodes count={low ? 26 : 54} reduced={reducedMotion} />
        <ProcessingRings reduced={reducedMotion} />
      </group>
      <Particles count={low ? 140 : 400} reduced={reducedMotion} />
      <MouseRig reduced={reducedMotion || low} />
    </Canvas>
  );
}

