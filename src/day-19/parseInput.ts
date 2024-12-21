import { splitInputByLine } from "../shared/splitInputByLine";

export type PuzzleInput = ReturnType<typeof parseInput>;

export function parseInput(input: string) {
  const [patternsLine, , ...towels] = splitInputByLine(input);
  const patterns = patternsLine.split(", ");

  return { patterns, towels };
}
