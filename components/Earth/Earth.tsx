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

const Earth = React.memo(({ showEarth }: { showEarth: boolean }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 1 }}
      style={{ width: "1700px", height: "1700px", position: 'absolute' , top: '-520px'}}
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
}, (prevProps, nextProps) => prevProps.showEarth === nextProps.showEarth);

export default Earth;
