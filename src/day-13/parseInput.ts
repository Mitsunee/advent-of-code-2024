import type { Position } from "../shared/coordinates";
import { splitInputByLine } from "../shared/splitInputByLine";

export interface ClawMachine {
  a: Position;
  b: Position;
  prizePos: Position;
}

export function parseInput(input: string) {
  const lines = splitInputByLine(input);
  let match: ReturnType<string["match"]>;
  const clawMachines = new Array<ClawMachine>();

  for (let i = 0; i < lines.length; i += 4) {
    match = lines[i].match(/A: X\+(\d+), Y\+(\d+)$/);
    if (!match) throw new Error(`Could not parse Button A: '${lines[i]}'`);
    const buttonA: Position = { x: Number(match[1]), y: Number(match[2]) };

    match = lines[i + 1].match(/B: X\+(\d+), Y\+(\d+)$/);
    if (!match) throw new Error(`Could not parse Button B: '${lines[i + 1]}'`);
    const buttonB: Position = { x: Number(match[1]), y: Number(match[2]) };

    match = lines[i + 2].match(/X=(\d+), Y=(\d+)$/);
    if (!match) throw new Error(`Could not parse Prize: '${lines[i + 2]}'`);
    const prize: Position = { x: Number(match[1]), y: Number(match[2]) };

    clawMachines.push({ a: buttonA, b: buttonB, prizePos: prize });
  }

  return clawMachines;
}
