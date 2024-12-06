import type { GuardPosition } from "./Position";

export function getStartingPos(map: string[]) {
  const pos: GuardPosition = { x: 0, y: 0, direction: 0 };

  // find starting position
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] != "^") continue;
      Object.assign(pos, { x, y });
      break;
    }
  }

  return pos;
}
