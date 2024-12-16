import type { Position } from "../shared/coordinates";
import { splitInputByLine } from "../shared/splitInputByLine";

export type PuzzleInput = ReturnType<typeof parseInput>;

export function parseInput(input: string) {
  const start: Position = { x: -1, y: -1 };
  const end: Position = { x: -1, y: -1 };
  const map = splitInputByLine(input);

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] == "S") {
        Object.assign(start, { x, y });
        continue;
      }
      if (map[y][x] == "E") {
        Object.assign(end, { x, y });
      }
    }
  }

  if (start.x < 0 || end.x < 0) {
    throw new Error("Input did not contain either start or end position");
  }

  return { start, end, map };
}
