import { countQuadrants } from "./countQuadrants";
import { createMoveRobot } from "./createMoveRobot";
import type { PuzzleInput } from "./parseInput";
import { visualizeMap } from "./visualizeMap";

export function partA(input: PuzzleInput) {
  const moveRobot = createMoveRobot(input.width, input.height);

  // move all robots 100 times
  input.robots.forEach(robot => moveRobot(robot, 100));
  visualizeMap(input, "final map:");

  const quadrants = countQuadrants(input);
  return quadrants.reduce((prod, val) => prod * val, 1);
}
