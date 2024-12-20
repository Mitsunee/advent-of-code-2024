import { List } from "@foxkit/list";
import type { Position } from "../shared/coordinates";
import { strWith } from "../shared/strWith";
import type { PuzzleInput } from "./parseInput";
import { findPath } from "./findPath";
import { log } from "../logger";

function markWall(pos: Position, map: string[]) {
  map[pos.y] = strWith(map[pos.y], pos.x, "#");
}

export function partB(
  { locations, map, width, height }: PuzzleInput,
  minLines: number
) {
  const queue = new List(locations);
  const start: Position = { x: 0, y: 0 };
  const end: Position = { x: width - 1, y: height - 1 };
  let processed = 0;
  let _temp: ReturnType<typeof findPath>;

  // apply minimum amount of lines from arg
  for (let i = 0; i < minLines; i++) {
    const location = queue.shift();
    if (!location) throw new Error("lines argument set too high");
    markWall({ x: location[0], y: location[1] }, map);
    processed++;
  }

  // DEBUG
  if (minLines > 0) log.debug(`Processed initial ${minLines} lines`);
  log.debug(`Run ${locations.length - queue.length + 1}`);

  // rerun with one more location until pathfinding fails
  while ((_temp = findPath(map, start, end, false)) !== null) {
    const location = queue.shift();
    if (!location) throw new Error("Ran out of locations");
    markWall({ x: location[0], y: location[1] }, map);
    processed++;

    // DEBUG
    log.debug(`Run ${locations.length - queue.length + 1}`);
  }

  return locations[processed - 1].join(",");
}
