import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, SphereGeometry } from "three";
import { useMovment } from "@/hooks/use-movment";

type Props = {};

const AnimatedBox = (props: Props) => {
  const meshRef = useRef<Mesh>(null);
  // useFrame((state, delta) => {
  //   if (meshRef.current) {
  //     meshRef.current.position.x += Math.sin(state.clock.elapsedTime) / 10;
  //     meshRef.current.position.z -= Math.cos(state.clock.elapsedTime) / 10;
  //     meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 4) / 10;
  //   }
  // });

  return (
    <>
      <mesh ref={meshRef} castShadow position={[0, 1.5, 0]}>
        <capsuleGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default AnimatedBox;
