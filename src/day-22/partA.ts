import { log } from "../logger";
import { createPRNG } from "./prng";

export function partA(seeds: number[]) {
  let sum = 0;

  for (const seed of seeds) {
    const gen = createPRNG(seed);
    // iterate 1999 times
    for (let i = 0; i < 1999; i++) gen.next();
    // save 2000th iteration
    const val = gen.next().value!;
    sum += val;

    log.debug({ seed, val });

    if (sum >= Number.MAX_SAFE_INTEGER) {
      log.warn("Sum is too large!");
    }
  }

  return sum;
}
