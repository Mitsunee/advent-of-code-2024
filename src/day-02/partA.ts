import type { PuzzleInput } from "./parseInput";
import { reportIsSafe } from "./reportIsSafe";

export function partA(lines: PuzzleInput) {
  return lines.filter(line => reportIsSafe(line)).length;
}
