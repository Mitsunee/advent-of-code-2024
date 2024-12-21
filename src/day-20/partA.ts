import { log } from "../logger";
import type { Direction, Directions, Position } from "../shared/coordinates";
import { directionMovement, positionToString } from "../shared/coordinates";
import { applyMovement } from "./applyMovement";
import { findPositions } from "./findPositions";
import { getFirstDirection } from "./getFirstDirection";
import { indexDistances } from "./indexDistances";

export function partA(map: string[]) {
  const { start, end } = findPositions(map);
  log.debug(
    `Starting at ${positionToString(start)}, Ending at: ${positionToString(end)}`
  );

  // get distances
  const distance = indexDistances(start, end, map);
  log.debug(`Indexed ${distance.size} tiles`);

  // track from start trying all possible skips
  const pos = getFirstDirection(start, map);
  const skips = Array<[Direction, number]>();

  function attemptSkip(
    pos: Direction,
    direction: Directions,
    projectedDistance: number
  ) {
    if (pos.direction == direction) return 0;
    const diff = directionMovement[direction];
    const skippedPosition: Position = {
      x: pos.x + diff.x * 2,
      y: pos.y + diff.y * 2
    };
    const skippedDistance = distance.get(positionToString(skippedPosition));

    // return 0 if skip not possible or caused backtracking
    if (typeof skippedDistance != "number") return 0;
    if (skippedDistance >= projectedDistance) return 0;

    skips.push([{ ...pos, direction }, projectedDistance - skippedDistance]);
    return 1;
  }

  while (pos.x != end.x || pos.y != end.y) {
    // look for possible skips
    const posStr = positionToString(pos);
    const currentDistance = distance.get(posStr);
    if (typeof currentDistance != "number") {
      throw new Error(`Unexpected position: ${posStr}`);
    }

    const projectedDistance = Math.max(0, currentDistance - 2);
    const skipsFound =
      attemptSkip(pos, "up", projectedDistance) +
      attemptSkip(pos, "right", projectedDistance) +
      attemptSkip(pos, "down", projectedDistance) +
      attemptSkip(pos, "left", projectedDistance);

    // DEBUG
    if (skipsFound > 0) {
      log.debug(`Found ${skipsFound} possible skips for ${posStr}`);
    }

    // move
    applyMovement(pos, map);
  }

  // DEBUG
  log.debug(`Found total of ${skips.length} possible skips for entire map`);

  const aboveTreshold = skips.filter(skip => skip[1] >= 100).length;
  log.debug(`Found total of ${aboveTreshold} skips above threshold of 100`);
  return aboveTreshold;
}
