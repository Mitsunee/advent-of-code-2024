import { log } from "../logger";
import type { createSorter } from "./createSorter";
import type { PuzzleInput } from "./parseInput";

export function partB(
  updates: PuzzleInput["updates"],
  sortUpdate: ReturnType<typeof createSorter>
) {
  let sum = 0;

  for (const update of updates) {
    log.debug(`Checking update '${update.join(",")}'`);
    const sorted = sortUpdate(update);
    if (update.join(",") == sorted.join(",")) continue;
    const middle = sorted[Math.floor(sorted.length / 2)];
    log.debug(`Update was not sorted, middle value after sorting is ${middle}`);
    sum += middle;
  }

  return sum;
}
