import type { Position } from "../shared/coordinates";
import { splitInputByLine } from "../shared/splitInputByLine";

export type PuzzleInput = ReturnType<typeof parseInput>;

export const directions = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }
} as const satisfies Record<"up" | "right" | "down" | "left", Position>;

export type Instruction = (typeof directions)["up" | "right" | "down" | "left"];

export function parseInput(input: string) {
  const lines = splitInputByLine(input);
  const map = new Array<string>();
  const instructions = new Array<Instruction>();
  const start: Position = { x: -1, y: -1 };
  let i = 0;

  // collect map rows
  for (; /#[#O@.]+#/.test(lines[i]); i++) {
    map.push(lines[i]);
    const idx = lines[i].indexOf("@");
    if (idx < 0) continue;
    Object.assign(start, { x: idx, y: i });
  }

  if (start.x < 0) throw new Error("Could not find start position");

  // skip empty row
  i++;

  for (; i < lines.length; i++) {
    for (const char of lines[i]) {
      switch (char) {
        case "^":
          instructions.push(directions.up);
          break;
        case ">":
          instructions.push(directions.right);
          break;
        case "v":
          instructions.push(directions.down);
          break;
        case "<":
          instructions.push(directions.left);
          break;
        default:
          throw new Error(`Unknown instruction '${char}' in line ${i}`);
      }
    }
  }

  return { map, start, instructions };
}
