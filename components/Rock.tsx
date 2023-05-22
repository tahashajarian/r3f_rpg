import { useGLTF } from "@react-three/drei";
import React from "react";

type Props = {};

const Rock = (props: Props) => {
  const rock = useGLTF("/models/trees/root.glb");
  return (
    <object3D scale={[1, 1, 1]}>
      <primitive object={rock.scene} />
    </object3D>
  );
};

export default Rock;
