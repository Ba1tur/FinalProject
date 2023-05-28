import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";

interface ModelProps {
  scale: number;
}

function Model(props: ModelProps) {
  const { scene } = useGLTF("/planet_earth.glb");

  return <primitive object={scene} {...props} />;
}

const Earth = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 1 }}
      style={{ width: "1600px", height: "1600px", position: 'absolute' , top: '-520px'}}
    >
      <Stage>
        <Model scale={0.01} />
      </Stage>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate
        rotateSpeed={0.2}
      />
    </Canvas>
  );
};

export default Earth;
