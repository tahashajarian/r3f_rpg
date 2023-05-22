import React from "react";

type Props = {};

const Lights = (props: Props) => {
  return (
    <>
      <ambientLight intensity={0.9} />
      {/* <directionalLight position={[-5, 5, -5]} intensity={0.5} castShadow wd/> */}
      <pointLight position={[5, 5, 5]} castShadow />
    </>
  );
};

export default Lights;
