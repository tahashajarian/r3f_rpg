"use client";
import Ground from "@/components/Ground";
import Lights from "@/components/Lights";
import Player from "@/components/Player";
import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  const debugging = true;
  return (
    <div id="canvas-container" className="h-screen bg-black">
      <Canvas
        shadows
        camera={{
          position: [0, 10, 10],
        }}
      >
        {debugging ? <Stats /> : null}
        {debugging ? <axesHelper args={[20]} /> : null}
        {debugging ? <gridHelper args={[20, 20]} /> : null}

        <Lights />
        {/* <OrbitControls /> */}
        <Ground />
        <Player />
      </Canvas>
    </div>
  );
}
