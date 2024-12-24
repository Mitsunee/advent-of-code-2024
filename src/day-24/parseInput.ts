import { splitInputByLine } from "../shared/splitInputByLine";

export interface Instruction {
  inputA: string;
  operator: "AND" | "OR" | "XOR";
  inputB: string;
  resultTo: string;
}

export type PuzzleInput = ReturnType<typeof parseInput>;

function isOperator(op: string): op is Instruction["operator"] {
  switch (op) {
    case "AND":
    case "OR":
    case "XOR":
      return true;
    default:
      return false;
  }
}

export function parseInput(input: string) {
  const lines = splitInputByLine(input);
  const values: Partial<Record<string, number>> = {};
  const instructions = new Array<Instruction>();
  let i = 0;

  for (; i < lines.length; i++) {
    // break at empty line
    if (!lines[i]) {
      i++;
      break;
    }

    const match = lines[i].match(/^(\w[\w\d]{2}): (0|1)/);
    if (!match) {
      throw new Error(`Could not parse line '${lines[i]}' as initial value`);
    }

    values[match[1]] = Number(match[2]);
  }

  for (; i < lines.length; i++) {
    const match = lines[i].match(
      /^(\w[\w\d]{2}) (AND|X?OR) (\w[\w\d]{2}) -> (\w[\w\d]{2})$/
    );
    if (!match || !isOperator(match[2])) {
      throw new Error(`Could not parse line '${lines[i]}' as instruction`);
    }

    const instruction: Instruction = {
      inputA: match[1],
      operator: match[2],
      inputB: match[3],
      resultTo: match[4]
    };

    instructions.push(instruction);
  }

  return { values: values as Record<string, number>, instructions };
}
