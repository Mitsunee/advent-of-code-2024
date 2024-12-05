import { splitInputByLine } from "../shared/splitInputByLine";

export interface PuzzleInput {
  rules: Array<[number, number]>;
  updates: Array<number[]>;
}

export function parseInput(input: string) {
  const rules: PuzzleInput["rules"] = [];
  const updates: PuzzleInput["updates"] = [];
  const lines = splitInputByLine(input);
  let i = 0;

  // parse rules
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (!line) break; // empty line means end of list of rules
    const [a, b] = line.split("|");
    const numA = Number(a.trim());
    const numB = Number(b.trim());
    if (isNaN(numA) || isNaN(numB)) {
      throw new Error(`Could not parse line as rule: '${line}'`);
    }
    rules.push([numA, numB]);
  }

  i++; // pass empty line

  // parse updates
  for (; i < lines.length; i++) {
    const line = lines[i];
    const nums = line.split(",").map(str => Number(str));
    if (nums.some(num => isNaN(num))) {
      throw new Error(`Could not parse line as upgrade: '${line}'`);
    }
    updates.push(nums);
  }

  const parsed: PuzzleInput = { rules, updates };
  return parsed;
}
