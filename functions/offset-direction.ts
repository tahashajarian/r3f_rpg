export const directionOffset = ({
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
