import React from "react";

type Props = {};

const Ground = (props: Props) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 100, 100]} />
      <meshStandardMaterial color={"#36b80b"} />
    </mesh>
  );
};

export default Ground;
