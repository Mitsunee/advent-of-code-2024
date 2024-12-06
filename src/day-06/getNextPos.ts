import { Direction } from "./Direction";
import type { GuardPosition } from "./Position";

export function getNextPos(pos: GuardPosition) {
  const nextPos: GuardPosition = Object.assign({}, pos);
  switch (pos.direction) {
    case Direction.up:
      nextPos.y--;
      break;
    case Direction.right:
      nextPos.x++;
      break;
    case Direction.down:
      nextPos.y++;
      break;
    case Direction.left:
      nextPos.x--;
      break;
  }

  return nextPos;
}
