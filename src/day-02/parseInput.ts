import { splitInputByLine } from "../shared/splitInputByLine";

export type InputLine = Array<number>;
export type PuzzleInput = Array<InputLine>;

export function parseInput(input: string): PuzzleInput {
  const lines = splitInputByLine(input);
  return lines.map(line => {
    const nums: InputLine = [];
    let current = 0;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char == " ") {
        nums.push(current);
        current = 0;
        continue;
      }

      current = current * 10 + Number(char);
    }

    if (current >= 0) nums.push(current);
    return nums;
  });
}
