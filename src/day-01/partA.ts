import type { PuzzleInput } from "./parseInput";
import { sortTupleValues } from "./sortTupleValues";

export function partA(list: PuzzleInput) {
  const sortFn = (a: number, b: number) => a - b;
  const sortedList = sortTupleValues(list, sortFn, sortFn);

  return sortedList.reduce((sum, [a, b]) => {
    return sum + Math.abs(a - b);
  }, 0);
}
