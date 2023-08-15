import Ground from "@/components/Ground";
import Lights from "@/components/Lights";
import Player from "@/components/Player";
import Rock from "@/components/Rock";
import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
type Props = {
  playerInfo: any;
  debugging: boolean;
};

const MyScene = (props: Props) => {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 3, 5],
      }}
    >
      {props.debugging ? <Stats /> : null}
      {props.debugging ? <axesHelper args={[20]} /> : null}
      {props.debugging ? <gridHelper args={[20, 20]} /> : null}

      <Lights />
      <Ground />
      <Player name={props.playerInfo.playerName} />
      <Rock />
    </Canvas>
  );
};

export default MyScene;
