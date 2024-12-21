import type { Position, PositionStr } from "../shared/coordinates";
import { positionToString } from "../shared/coordinates";
import { applyMovement } from "./applyMovement";
import { getFirstDirection } from "./getFirstDirection";

export function indexDistances(start: Position, end: Position, map: string[]) {
  const distance = new Map<PositionStr, number>();
  const pos = getFirstDirection(end, map);
  distance.set(positionToString(pos), 0);

  while (pos.x != start.x || pos.y != start.y) {
    // move
    applyMovement(pos, map);
    const posStr = positionToString(pos);

    // loop protection
    if (distance.has(posStr)) {
      throw new Error(`Position indexed twice: ${posStr}`);
    }

    // save to map
    distance.set(posStr, distance.size);
  }

  return distance;
}
