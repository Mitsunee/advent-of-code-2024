import type { Position } from "../shared/coordinates";

export function findPositions(map: string[]) {
  const start: Position = { x: -1, y: -1 };
  const end: Position = { x: -1, y: -1 };

  // find start and end position
  for (let y = 1; y < map.length; y++) {
    for (let x = 1; x < map[y].length; x++) {
      const char = map[y][x];
      if (char == "S") Object.assign(start, { x, y });
      else if (char == "E") Object.assign(end, { x, y });
      if (start.x > 0 && end.x > 0) break;
    }
  }

  // confirm that we found both start and end
  if (start.x < 0 || end.x < 0) {
    throw new Error("Could not find start or end position");
  }

  return { start, end };
}
