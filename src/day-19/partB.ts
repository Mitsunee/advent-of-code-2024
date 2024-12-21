import { log } from "../logger";
import type { PuzzleInput } from "./parseInput";

function createSolver(patterns: string[]) {
  const cache = new Map<string, number>();

  function solvePattern(towel: string): number {
    const cached = cache.get(towel);
    if (cached !== undefined) return cached;

    let totalSolutions = 0;
    const candidates = patterns
      .filter(pattern => towel.startsWith(pattern))
      .sort((a, b) => b.length - a.length);

    for (const candidate of candidates) {
      const remainingLen = towel.length - candidate.length;
      if (remainingLen < 1) {
        totalSolutions++;
        continue;
      }
      const remainingStr = towel.slice(-1 * remainingLen);
      const solutions = solvePattern(remainingStr);
      totalSolutions += solutions;
    }

    cache.set(towel, totalSolutions);
    return totalSolutions;
  }

  return solvePattern;
}

export function partB({ towels, patterns }: PuzzleInput) {
  const solvePattern = createSolver(patterns);
  let totalSolutions = 0;

  for (const towel of towels) {
    log.debug(`Solving towel ${towel}`);
    const solutions = solvePattern(towel);
    if (solutions < 1) {
      log.debug(`Found no solution for towel ${towel}`);
    } else {
      log.debug(`Found ${solutions} solutions for towel ${towel}`);
    }

    totalSolutions += solutions;
  }

  return totalSolutions;
}
