"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Procedural glass tower                                            */
/* ------------------------------------------------------------------ */

interface BuildingProps {
  mouseX: number;
  mouseY: number;
}

function Building({ mouseX, mouseY }: BuildingProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const idleTimer = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0 });
  const autoAngle = useRef(0);
  const isIdle = useRef(false);

  const FLOORS = 24;
  const FLOOR_W = 2;
  const FLOOR_D = 2;
  const FLOOR_H = 0.12;
  const FLOOR_GAP = 0.15;

  /* ---------- materials (stable refs) ---------- */
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a2a3a"),
        transmission: 0.6,
        roughness: 0.1,
        metalness: 0.3,
        envMapIntensity: 1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2A2A2A"),
        roughness: 0.8,
        metalness: 0.2,
      }),
    []
  );

  const mullionMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0e1418"),
        roughness: 0.4,
        metalness: 0.6,
      }),
    []
  );

  /* ---------- interior light positions ---------- */
  const interiorLights = useMemo(() => {
    const lights: { position: [number, number, number] }[] = [];
    for (let i = 0; i < FLOORS; i++) {
      if (Math.random() > 0.45) {
        const x = (Math.random() - 0.5) * (FLOOR_W * 0.6);
        const z = (Math.random() - 0.5) * (FLOOR_D * 0.6);
        const y = i * FLOOR_GAP + FLOOR_H * 0.5;
        lights.push({ position: [x, y, z] });
      }
    }
    return lights;
  }, []);

  /* ---------- mullion positions ---------- */
  const mullions = useMemo(() => {
    const arr: { position: [number, number, number]; scaleY: number }[] = [];
    const totalH = FLOORS * FLOOR_GAP;
    const count = 6;
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i <= count; i++) {
        const t = (i / count) * FLOOR_W - FLOOR_W / 2;
        let x = 0,
          z = 0;
        if (side === 0) {
          x = t;
          z = FLOOR_D / 2;
        } else if (side === 1) {
          x = t;
          z = -FLOOR_D / 2;
        } else if (side === 2) {
          x = FLOOR_W / 2;
          z = t;
        } else {
          x = -FLOOR_W / 2;
          z = t;
        }
        arr.push({
          position: [x, totalH / 2, z],
          scaleY: totalH,
        });
      }
    }
    return arr;
  }, []);

  /* ---------- frame loop ---------- */
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dx = Math.abs(mouseX - lastMouse.current.x);
    const dy = Math.abs(mouseY - lastMouse.current.y);
    lastMouse.current = { x: mouseX, y: mouseY };

    if (dx > 0.001 || dy > 0.001) {
      idleTimer.current = 0;
      isIdle.current = false;
    } else {
      idleTimer.current += delta;
      if (idleTimer.current > 2) isIdle.current = true;
    }

    if (isIdle.current) {
      autoAngle.current += 0.002;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        autoAngle.current,
        0.05
      );
    } else {
      const targetY = mouseX * 0.5;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.05
      );
      autoAngle.current = groupRef.current.rotation.y;
    }

    /* subtle tilt on Y axis from mouseY */
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY * -0.08,
      0.05
    );
  });

  const totalH = FLOORS * FLOOR_GAP;

  return (
    <group ref={groupRef} position={[0, -totalH / 2 + 0.5, 0]}>
      {/* ----- floor plates ----- */}
      {Array.from({ length: FLOORS }).map((_, i) => (
        <mesh
          key={`floor-${i}`}
          position={[0, i * FLOOR_GAP, 0]}
          material={glassMat}
        >
          <boxGeometry args={[FLOOR_W, FLOOR_H, FLOOR_D]} />
        </mesh>
      ))}

      {/* ----- concrete core ----- */}
      <mesh position={[0, totalH / 2, 0]} material={coreMat}>
        <boxGeometry args={[0.3, totalH, 0.3]} />
      </mesh>

      {/* ----- vertical mullions ----- */}
      {mullions.map((m, i) => (
        <mesh key={`mul-${i}`} position={m.position} material={mullionMat}>
          <boxGeometry args={[0.015, m.scaleY, 0.015]} />
        </mesh>
      ))}

      {/* ----- interior warm lights ----- */}
      {interiorLights.map((l, i) => (
        <pointLight
          key={`il-${i}`}
          position={l.position}
          color="#FFD699"
          intensity={0.3}
          distance={1.2}
          decay={2}
        />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera rig that responds to mouseY                                */
/* ------------------------------------------------------------------ */

function CameraRig({ mouseY }: { mouseY: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const desiredY = 2 + mouseY * 0.6;
    target.current.y = THREE.MathUtils.lerp(target.current.y, desiredY, 0.05);
    camera.lookAt(target.current);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Exported wrapper                                                  */
/* ------------------------------------------------------------------ */

interface Building3DProps {
  mouseX: number;
  mouseY: number;
}

export default function Building3D({ mouseX, mouseY }: Building3DProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "#050505" }}
      >
        {/* fog */}
        <fog attach="fog" args={["#050505", 8, 25]} />

        {/* lighting */}
        <ambientLight intensity={0.15} color="#F5F2EA" />
        <directionalLight
          position={[4, 6, 3]}
          intensity={0.6}
          color="#F5F2EA"
          castShadow={false}
        />
        <directionalLight
          position={[-5, 3, -2]}
          intensity={0.3}
          color="#C8A96B"
        />

        {/* environment for reflections */}
        <Environment preset="city" />

        {/* building */}
        <Float speed={0.6} rotationIntensity={0} floatIntensity={0.15}>
          <Building mouseX={mouseX} mouseY={mouseY} />
        </Float>

        {/* contact shadows */}
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.3}
          blur={2.5}
          scale={10}
          far={4}
        />

        {/* camera rig */}
        <CameraRig mouseY={mouseY} />
      </Canvas>
    </div>
  );
}
