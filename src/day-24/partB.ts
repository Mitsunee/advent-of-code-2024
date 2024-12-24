import { log } from "../logger";
import { applyInstructions } from "./applyInstructions";
import { getSystemOutput } from "./getSystemOutput";
import type { Instruction, PuzzleInput } from "./parseInput";

function findIncorrectDigits(solvedValues: PuzzleInput["values"]) {
  const x = getSystemOutput(solvedValues, "x", false);
  const y = getSystemOutput(solvedValues, "y", false);
  let z = getSystemOutput(solvedValues, "z", false).toString(2);
  let expected = (x + y).toString(2);

  // normalize lengths
  if (z.length > expected.length) {
    expected = "0".repeat(z.length - expected.length) + expected;
  }
  if (expected.length > z.length) {
    z = "0".repeat(expected.length - z.length) + z;
  }

  // find incorrect digits
  const incorrect = new Array<string>();
  for (let i = 0; i < z.length; i++) {
    const idx = z.length - 1 - i;
    const zDigit = z[idx];
    const eDigit = expected[idx];
    if (zDigit != eDigit) incorrect.push(`z${i.toString().padStart(2, "0")}`);
  }

  return incorrect;
}

function createInstructionUtils(instructions: Instruction[]) {
  const cache = new Map<string, Instruction[]>();

  function findRelatedInstructions(output: string): Instruction[] {
    const cached = cache.get(output);
    if (cached) return cached;

    const instruction = instructions.find(
      instruction => instruction.resultTo == output
    );
    if (!instruction) return [];

    const result = [
      instruction,
      findRelatedInstructions(instruction.inputA),
      findRelatedInstructions(instruction.inputB)
    ].flat();
    cache.set(output, result);
    return result;
  }

  function scoreInstruction(instruction: Instruction) {
    const childrenA = new Set(findRelatedInstructions(instruction.inputA));
    const childrenB = new Set(findRelatedInstructions(instruction.inputB));
    return childrenA.intersection(childrenB).size;
  }

  return { findRelatedInstructions, scoreInstruction };
}

function findSwapCanditates(
  incorrect: Array<[string, Instruction[]]>,
  scoreInstruction: (i: Instruction) => number
) {
  const candidates = Array<[string, string, string, Instruction[]]>();
  const completedTriplets = new Set<string>();

  for (let i = 0; i < incorrect.length; i++) {
    for (let j = 0; j < incorrect.length; j++) {
      if (i == j) continue;
      for (let k = 0; k < incorrect.length; k++) {
        if (k == i || k == j) continue;
        const id = [incorrect[i][0], incorrect[j][0], incorrect[k][0]]
          .sort()
          .join(",");
        if (completedTriplets.has(id)) continue;
        completedTriplets.add(id);

        const setA = new Set(incorrect[i][1]);
        const setB = new Set(incorrect[j][1]);
        const setC = new Set(incorrect[k][1]);
        const setAB = setA.intersection(setB);
        const setABC = setAB.intersection(setC);

        candidates.push([
          incorrect[i][0],
          incorrect[j][0],
          incorrect[k][0],
          Array.from(setABC).sort(
            (a, b) => scoreInstruction(b) - scoreInstruction(a)
          )
        ]);
      }
    }
  }

  return candidates;
}

/**
 * This solution is not perfect and makes assumptions about the input:
 * - My input needed to swap 7 digits which were `0`, 3 digits which were `1`
 * - There is an instruction that swaps 4 of the zeroes
 *
 * I couldn't actually find a way to determine which "perfect" swap exists (if
 * one even does exist at all), because literally the first possible swap creates
 * an infinite loop with my input.
 */
export function partB({ values, instructions }: PuzzleInput) {
  const solved = applyInstructions({ values, instructions });
  const { findRelatedInstructions, scoreInstruction } =
    createInstructionUtils(instructions);
  const incorrect = findIncorrectDigits(solved).map(
    digit => [digit, findRelatedInstructions(digit)] as [string, Instruction[]]
  );

  const candidates = findSwapCanditates(
    incorrect.filter(([key]) => solved[key] == 0),
    scoreInstruction
  ).sort((a, b) => b[3].length - a[3].length);

  log.debug({
    candidates: candidates.map(candidate =>
      // @ts-ignore
      candidate.with(3, candidate[3].length)
    )
  });

  throw new Error("solution unfinished");
}
