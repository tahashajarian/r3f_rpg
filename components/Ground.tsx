import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

type Props = {};

const Ground = (props: Props) => {
  const [colorMap, displacementMap] = useLoader(TextureLoader, [
    "/textures/ground/red_laterite_soil_stones_diff_1k.jpg",
    "/textures/ground/red_laterite_soil_stones_disp_1k.png",
  ]);

  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.offset.set(0, 0);
  colorMap.repeat.set(20, 20);

  displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.offset.set(0, 0);
  displacementMap.repeat.set(10, 10);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

export default Ground;
