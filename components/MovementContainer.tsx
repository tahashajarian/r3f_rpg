import { directionOffset } from "@/functions/offset-direction";
import { useArrows } from "@/hooks/use-arrows";
import {
  OrbitControls,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {
  model: GLTF;
};

let walkDirection = new THREE.Vector3();
let rotatAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const MovementContainer = (props: Props) => {
  const { actions } = useAnimations(props.model.animations, props.model.scene);

  const controlRef: any = useRef(null);
  const camera = useThree((state) => state.camera);
  const { right, forward, left, backward } = useArrows();
  const currentAction = useRef("");

  const updateCamera = (moveX: number, moveZ: number) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;
    cameraTarget.x = props.model.scene.position.x;
    cameraTarget.y = props.model.scene.position.y + 2;
    cameraTarget.z = props.model.scene.position.z;
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
    cameraTarget.x = props.model.scene.position.x;
    cameraTarget.y = props.model.scene.position.y + 2;
    cameraTarget.z = props.model.scene.position.z;
    if (controlRef.current) {
      controlRef.current.target = cameraTarget;
    }
  }, []);

  useFrame((state, delta) => {
    if (currentAction.current === "walking") {
      let angleYCameraDirection = Math.atan2(
        camera.position.x - props.model.scene.position.x,
        camera.position.z - props.model.scene.position.z
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
      props.model.scene.quaternion.rotateTowards(rotateQuaternion, 0.2);

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotatAngle, newDirectionOffset);

      const velocity = 1;
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      props.model.scene.position.x += moveX;
      props.model.scene.position.z += moveZ;
      updateCamera(moveX, moveZ);
    }
  });

  return (
    <>
      <OrbitControls ref={controlRef} />
      <primitive object={props.model.scene} />
    </>
  );
};

export default MovementContainer;
