import { log } from "../logger";
import { positionToString } from "../shared/coordinates";
import type { PuzzleInput } from "./parseInput";

export function countQuadrants({ width, height, robots }: PuzzleInput) {
  const quadrants = Array<number>(4).fill(0);

  // determine skipped row and col for uneven dimensions
  const midX = width / 2;
  const midY = height / 2;
  let skipX = -1;
  let skipY = -1;
  if (width % 2 == 1) {
    skipX = Math.floor(midX);
    log.debug(`Skipping all robots with X coordinate ${skipX}`);
  }
  if (height % 2 == 1) {
    skipY = Math.floor(midY);
    log.debug(`Skipping all robots with Y coordinate ${skipY}`);
  }

  // count robots in each quadrant
  for (const robot of robots) {
    if (robot.x == skipX || robot.y == skipY) {
      log.debug(`Robot at ${positionToString(robot)} skipped`);
      continue;
    }

    // determine quadrant
    let q = 0;
    const isRightQuad = robot.x >= midX;
    const isLowerQuad = robot.y >= midY;
    if (isRightQuad) q = 1;
    if (isLowerQuad) q += 2;

    // save result
    log.debug(`Robot at ${positionToString(robot)} is in quadrant ${q}`);
    quadrants[q]++;
  }

  log.debug(quadrants);
  return quadrants;
}
