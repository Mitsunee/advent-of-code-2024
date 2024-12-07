import type { MathOpFn } from "./bruteforceCombinations";
import { bruteforceCombinations } from "./bruteforceCombinations";
import { parseInput } from "./parseInput";

const add: MathOpFn = (a, b) => a + b;
const multiply: MathOpFn = (a, b) => a * b;
export const concat: MathOpFn = (left, right) => {
  const rightDigits = right.toString().length;
  return left * Math.pow(10, rightDigits) + right;
};

export function solve(input: string, isPartB: boolean) {
  const parsedInput = parseInput(input);
  let sum = BigInt(0);
  const ops = [add, multiply];
  if (isPartB) ops.push(concat);

  for (const { res, nums } of parsedInput) {
    const possibleResults = new Set(bruteforceCombinations(nums, ops));
    if (possibleResults.has(res)) sum += BigInt(res);
  }

  return sum;
}
