import { log, logger } from "../logger";
import { countQuadrants } from "./countQuadrants";
import { createMoveRobot } from "./createMoveRobot";
import type { PuzzleInput } from "./parseInput";
import { visualizeMap } from "./visualizeMap";

const MAX = 10_000_000;

/**
 * Got the hint to check the quadrants for how many robots are in it on reddit
 * So I added a flag to set the treshold, with a default that worked well for
 * my own input
 * @param input PuzzleInput
 * @param threshold Factor of Robots to look for in quadrants (such as 0.415 for 41.5%)
 * @returns a potential result :)
 */
export function partB(input: PuzzleInput, threshold: number) {
  let iterations = 0;
  const searchAmount = input.robots.length * threshold;
  const moveRobot = createMoveRobot(input.width, input.height);

  while (++iterations <= MAX) {
    // that's a lot!
    if (iterations % 100_000 == 0) {
      log.warn(`Iteration ${iterations.toLocaleString()}`);
    }

    // move robots once and count
    input.robots.forEach(robot => moveRobot(robot, 1));
    const quadrants = countQuadrants(input);

    // check if we met the treshold yet
    if (!quadrants.some(amount => amount > searchAmount)) continue;
    log.success(`Potential tree at ${iterations.toLocaleString()} iterations:`);

    // visualize even if the user didn't chose Debug as log level I guess
    const level = logger.getLogLevel();
    if (level != "Debug") logger.setLogLevel("Debug");
    visualizeMap(input);
    logger.setLogLevel(level);

    // quit with potential result
    return iterations;
  }

  log.error(
    `Did not find a potential result within ${MAX.toLocaleString()} iterations`
  );

  return -1;
}
