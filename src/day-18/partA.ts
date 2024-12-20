import type { PuzzleInput } from "./parseInput";
import { findPath } from "./findPath";
import { log } from "../logger";
import { strWith } from "../shared/strWith";

export function partA(
  { locations, map, width, height }: PuzzleInput,
  maxLines: number
) {
  let processedLocations = locations;
  if (maxLines > 0) {
    log.debug(`Only processing the first ${maxLines} locations`);
    processedLocations = locations.slice(0, maxLines);
  }

  for (const [x, y] of processedLocations) {
    map[y] = strWith(map[y], x, "#");
  }

  if (map[0][0] == "#") {
    throw new Error("There's a wall at the start location");
  }
  if (map[height - 1][width - 1] == "#") {
    throw new Error("There's a wall at the end location");
  }

  const cheapestPath = findPath(
    map,
    { x: 0, y: 0 },
    { x: width - 1, y: height - 1 }
  );

  if (cheapestPath === null) {
    throw new Error("Found no valid path");
  }

  return cheapestPath;
}
