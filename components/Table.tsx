import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {};

const Table = (props: Props) => {
  const table = useLoader(GLTFLoader, "/models/table.glb");
  return (
    <object3D position={[0, 2, 0]}>
      <primitive object={table.scene} />;
    </object3D>
  );
};

export default Table;
