import { log } from "../logger";
import type { PuzzleInput } from "./parseInput";
import { splitTuples } from "./splitTuples";

const cache = new Map<number, number>();

export function partB(list: PuzzleInput) {
  const [left, right] = splitTuples(list);

  return left.reduce((sum, numL) => {
    log.debug(`Counting ${numL}`);
    const cached = cache.get(numL);
    if (cached !== undefined) {
      log.debug(`Cached score: ${cached}`);
      return sum + cached;
    }

    const count = right.reduce((count, numR) => {
      return count + (numR == numL ? 1 : 0);
    }, 0);
    const score = numL * count;
    log.debug(`Counted ${count}, score: ${score}`);

    cache.set(numL, score);
    return sum + score;
  }, 0);
}
