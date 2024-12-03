import { findMulInstr } from "./findMulInstr";

export function partA(input: string) {
  return findMulInstr(input).reduce((sum, [a, b]) => sum + a * b, 0);
}
