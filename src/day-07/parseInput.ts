import { splitInputByLine } from "../shared/splitInputByLine";

export type PuzzleInput = ReturnType<typeof parseInput>;

function parseInputLine(line: string) {
  const [resStr, rest] = line.split(":");
  const res = Number(resStr);
  const nums = rest
    .trimStart()
    .split(" ")
    .map(n => Number(n));
  if (isNaN(res) || nums.some(n => isNaN(n))) {
    throw new Error(`Could not parse input line: ${line}`);
  }

  return { res, nums };
}

export function parseInput(input: string) {
  const lines = splitInputByLine(input);
  return lines.map(line => parseInputLine(line));
}
