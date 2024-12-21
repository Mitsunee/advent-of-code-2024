import { log } from "../logger";
import type { PuzzleInput } from "./parseInput";

function createSolver(patterns: string[]) {
  const cache = new Map<string, ReturnType<typeof solvePattern>>();

  function solvePattern(towel: string): string[] | undefined {
    if (cache.has(towel)) return cache.get(towel);

    const candidates = patterns
      .filter(pattern => towel.startsWith(pattern))
      .sort((a, b) => b.length - a.length);

    if (candidates.length < 1) return;

    const completedWith = candidates.find(pattern => pattern == towel);
    if (completedWith) {
      return [completedWith];
    }

    for (const candidate of candidates) {
      const remainingLen = towel.length - candidate.length;
      const remainingStr = towel.slice(-1 * remainingLen);
      const solution = solvePattern(remainingStr);
      if (!solution) continue;
      const fullSolution = [candidate, ...solution];
      cache.set(towel, fullSolution);
      return fullSolution;
    }

    cache.set(towel, undefined);
    return undefined;
  }

  return solvePattern;
}

export function partA({ patterns, towels }: PuzzleInput) {
  const solvePattern = createSolver(patterns);
  let possible = 0;

  for (const towel of towels) {
    log.debug(`Solving towel ${towel}`);
    const solution = solvePattern(towel);
    if (!solution) {
      log.debug(`Found no solution for towel ${towel}`);
      continue;
    }

    log.debug(`Found solution for towel ${towel}`);
    possible++;
  }

  return possible;
}
