import { useArrows } from "@/hooks/use-arrows";
import { useMovment } from "@/hooks/use-movment";
import {
  OrbitControls,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {};

let walkDirection = new THREE.Vector3();
let rotatAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();
const directionOffset = ({
  forward,
  backward,
  left,
  right,
}: {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}) => {
  let directionOffset = 0;
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4;
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (right) {
      directionOffset = -Math.PI / 34 - Math.PI / 2;
    } else {
      directionOffset = Math.PI;
    }
  } else if (left) {
    directionOffset = Math.PI / 2;
  } else if (right) {
    directionOffset = -Math.PI / 2;
  }
  return directionOffset;
};

const Player = (props: Props) => {
  const playerModel = useGLTF("/models/Ty.glb");
  const { actions } = useAnimations(playerModel.animations, playerModel.scene);

  const playerRef = useRef(null);
  const controlRef = useRef(null);
  const camera = useThree((state) => state.camera);
  const { right, forward, left, backward } = useArrows();
  const currentAction = useRef("");

  const updateCamera = (moveX: number, moveZ: number) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;
    cameraTarget.x = playerModel.scene.position.x;
    cameraTarget.y = playerModel.scene.position.y;
    cameraTarget.z = playerModel.scene.position.z;
    if (controlRef.current) {
      controlRef.current.target = cameraTarget;
    }
  };

  useEffect(() => {
    let action = "";
    if (right || left || forward || backward) {
      action = "walking";
    } else {
      action = "idle";
    }
    if (currentAction.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [right, left, forward, backward]);

  useEffect(() => {
    console.log(actions);
    actions?.idle?.play();
    // actions?.wallking?.fadeOut(1);
  }, [actions]);

  useFrame((state, delta) => {
    if (currentAction.current === "walking") {
      let angleYCameraDirection = Math.atan2(
        camera.position.x - playerModel.scene.position.x,
        camera.position.z - playerModel.scene.position.z
      );
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });
      rotateQuaternion.setFromAxisAngle(
        rotatAngle,
        angleYCameraDirection + newDirectionOffset
      );
      playerModel.scene.quaternion.rotateTowards(rotateQuaternion, 0.2);

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotatAngle, newDirectionOffset);

      const velocity = 1;
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      playerModel.scene.position.x += moveX;
      playerModel.scene.position.z += moveZ;
      updateCamera(moveX, moveZ);
    }
  });

  return (
    <>
      <OrbitControls ref={controlRef} />
      <primitive object={playerModel.scene} />
    </>
  );
};

export default Player;
