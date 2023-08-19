import MovementContainer from "./MovementContainer";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useSelector } from "react-redux";

type Props = {};

const Player = (props: Props) => {
  const name = useSelector((state: any) => state?.user?.name);
  const playerModel: GLTF = useLoader(GLTFLoader, "/models/characters/Ty.glb");

  return <MovementContainer name={name} model={playerModel} withCamera />;
};

export default Player;
