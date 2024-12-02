import type { InputLine } from "./parseInput";

export function getDirection(a: number, b: number) {
  if (a == b) return "equal";
  return a < b ? "up" : "down";
}

export function checkDifference(a: number, b: number) {
  const diff = Math.abs(a - b);
  return diff >= 1 && diff <= 3;
}

export function reportIsSafe(line: InputLine) {
  // get initial direction
  const dir = getDirection(line[0], line[1]);

  // check first two numbers
  if (dir == "equal" || !checkDifference(line[0], line[1])) return false;

  // check rest of the numbers
  for (let i = 2; i < line.length; i++) {
    const prev = line[i - 1];
    const val = line[i];
    if (getDirection(prev, val) != dir || !checkDifference(prev, val)) {
      return false;
    }
  }

  return true;
}
