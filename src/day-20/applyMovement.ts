import type { Direction } from "../shared/coordinates";
import { directionMovement } from "../shared/coordinates";
import { getNextDirection } from "./getNextDirection";

export function applyMovement(pos: Direction, map: string[]) {
  const diff = directionMovement[pos.direction];
  pos.x += diff.x;
  pos.y += diff.y;
  pos.direction = getNextDirection(pos, map);
}
