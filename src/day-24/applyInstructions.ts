import { List } from "@foxkit/list";
import type { Instruction, PuzzleInput } from "./parseInput";

export function applyInstructions({ values, instructions }: PuzzleInput) {
  const solved: typeof values = { ...values };
  const queue = new List(instructions);
  let current: undefined | Instruction = undefined;
  while ((current = queue.shift())) {
    const inputA = solved[current.inputA];
    const inputB = solved[current.inputB];
    if (inputA === undefined || inputB === undefined) {
      queue.push(current);
      continue;
    }

    let output: number;
    switch (current.operator) {
      case "AND":
        output = Number(inputA && inputB);
        break;
      case "OR":
        output = inputA || inputB;
        break;
      case "XOR":
        output = Number(inputA != inputB);
    }

    solved[current.resultTo] = output;
  }

  return solved;
}
