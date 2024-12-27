import { log } from "../logger";
import type { PuzzleInput } from "./parseInput";

export function solve({ keys, locks }: PuzzleInput) {
  let pairs = 0;
  log.debug({ locks: locks.length, keys: keys.length });

  for (const lock of locks) {
    log.debug({ lock });
    const matchingKeys = keys.filter(key =>
      key.every((val, i) => val + lock[i] <= 5)
    );

    log.debug(`Found ${matchingKeys.length} matching keys`);
    if (matchingKeys.length < 1) continue;

    pairs += matchingKeys.length;
    matchingKeys.forEach(values => log.debug(values.join()));
  }

  return pairs;
}
