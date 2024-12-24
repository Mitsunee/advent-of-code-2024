import type { PuzzleInput } from "./parseInput";
import { getSystemOutput } from "./getSystemOutput";
import { applyInstructions } from "./applyInstructions";

export function partA({ values, instructions }: PuzzleInput) {
  const solved = applyInstructions({ values, instructions });

  return getSystemOutput(solved, "z");
}
