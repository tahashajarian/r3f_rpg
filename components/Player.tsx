import MovementContainer from "./MovementContainer";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

type Props = {};

const Player = (props: Props) => {
  const playerModel: GLTF = useLoader(GLTFLoader, "/models/characters/Ty.glb");

  return <MovementContainer model={playerModel} />;
};

export default Player;
