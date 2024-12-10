import type { Position } from "../shared/coordinates";

export function* findTrailHeads(map: string[]) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] != "0") continue;
      const pos: Position = { x, y };
      yield pos;
    }
  }
}
