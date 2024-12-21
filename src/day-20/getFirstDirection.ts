import type { Direction, Position } from "../shared/coordinates";

export function getFirstDirection(pos: Position, map: string[]) {
  const dir: Direction = { ...pos, direction: "up" };

  // try up
  if (dir.y >= 2 && map[dir.y - 1][dir.x] != "#") return dir;

  // try right
  if (dir.x < map[0].length - 2 && map[dir.y][dir.x + 1] != "#") {
    dir.direction = "right";
    return dir;
  }

  // try down
  if (dir.y < map.length - 2 && map[dir.y + 1][dir.x] != "#") {
    dir.direction = "down";
    return dir;
  }

  // try left
  if (dir.x >= 2 && map[dir.y][dir.x - 1] != "#") {
    dir.direction = "left";
    return dir;
  }

  throw new Error("Could not find valid direction from end position");
}
