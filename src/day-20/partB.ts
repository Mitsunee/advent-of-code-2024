import { log } from "../logger";
import type { Position } from "../shared/coordinates";
import { positionToString } from "../shared/coordinates";
import { applyMovement } from "./applyMovement";
import { findPositions } from "./findPositions";
import { getFirstDirection } from "./getFirstDirection";
import { indexDistances } from "./indexDistances";

export function partB(map: string[]) {
  const { start, end } = findPositions(map);
  log.debug(
    `Starting at ${positionToString(start)}, Ending at: ${positionToString(end)}`
  );

  // get distances
  const distance = indexDistances(start, end, map);
  log.debug(`Indexed ${distance.size} tiles`);

  // track from start trying all possible skips
  const pos = getFirstDirection(start, map);
  const skips = Array<[Position, Position, number]>();

  while (pos.x != end.x || pos.y != end.y) {
    // look for possible skips
    const posStr = positionToString(pos);
    const currentDist = distance.get(posStr);
    if (typeof currentDist != "number") {
      throw new Error(`Unexpected position: ${posStr}`);
    }

    for (let diffY = -20; diffY <= 20; diffY++) {
      const cheatLeft = 20 - Math.abs(diffY);
      for (let diffX = 0 - cheatLeft; diffX <= cheatLeft; diffX++) {
        // determine tiles moved
        const tilesMoved = Math.abs(diffY) + Math.abs(diffX);
        const projectedDist = Math.max(0, currentDist - tilesMoved);
        if (tilesMoved < 2) continue;

        const skippedPos: Position = {
          x: pos.x + diffX,
          y: pos.y + diffY
        };

        // determine whether we ended up on a valid position on the path
        const skippedDist = distance.get(positionToString(skippedPos));
        if (typeof skippedDist != "number") continue;
        if (skippedDist >= projectedDist) continue;

        // add skip
        skips.push([pos, { x: diffX, y: diffY }, projectedDist - skippedDist]);
      }
    }

    // move
    applyMovement(pos, map);
  }

  // DEBUG
  log.debug(`Found total of ${skips.length} possible skips for entire map`);
  /* visualizes skips
  log.debug(
    skips
      .filter(skip => skip[2] >= 50)
      .sort((a, b) => a[2] - b[2])
      .reduce(
        (rec, skip) => {
          rec[skip[2]] ||= 0;
          rec[skip[2]]++;
          return rec;
        },
        {} as Record<number, number>
      )
  ); //*/

  const aboveTreshold = skips.filter(skip => skip[2] >= 100).length;
  log.debug(`Found total of ${aboveTreshold} skips above threshold of 100`);
  return aboveTreshold;
}
