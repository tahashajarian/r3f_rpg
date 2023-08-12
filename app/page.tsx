"use client";
import Ground from "@/components/Ground";
import Lights from "@/components/Lights";
import Player from "@/components/Player";
import Rock from "@/components/Rock";
import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  const debugging = true;
  return (
    <div id="canvas-container" className="h-screen bg-black">
      <Canvas
        shadows
        camera={{
          position: [0, 3, 5],
        }}
      >
        {debugging ? <Stats /> : null}
        {debugging ? <axesHelper args={[20]} /> : null}
        {debugging ? <gridHelper args={[20, 20]} /> : null}

        <Lights />
        <Ground />
        <Player />
        <Rock />
      </Canvas>
    </div>
  );
}
