import { log, logger } from "../logger";
import { col } from "../shared/color";
import type { Direction } from "../shared/coordinates";
import { directionToString } from "../shared/coordinates";

export function getNextDirection(pos: Direction, map: string[]) {
  // don't do anything if we're at start
  const char = map[pos.y][pos.x];
  if (char == "S" || char == "E") return pos.direction;

  // try up
  if (pos.direction != "down" && pos.y >= 2 && map[pos.y - 1][pos.x] != "#") {
    return "up";
  }

  // try right
  if (
    pos.direction != "left" &&
    pos.x < map[0].length - 2 &&
    map[pos.y][pos.x + 1] != "#"
  ) {
    return "right";
  }

  // try down
  if (
    pos.direction != "up" &&
    pos.y < map.length - 2 &&
    map[pos.y + 1][pos.x] != "#"
  ) {
    return "down";
  }

  // try left
  if (pos.direction != "right" && pos.x >= 2 && map[pos.y][pos.x - 1] != "#") {
    return "left";
  }

  const e = Error(
    `Could not find valid direction from ${directionToString(pos)}`
  );
  log.error(e.message);
  if (logger.getLogLevel() == "Debug") {
    const visualized = map
      .map((row, y) => {
        if (y < pos.y - 3 || y > pos.y + 3) return row;
        const rowArr = row.split("");
        if (pos.y == y) rowArr[pos.x] = col.bgRed(rowArr[pos.x]);
        return rowArr.slice(Math.max(0, pos.x - 3), pos.x + 3).join("");
      })
      .slice(Math.max(0, pos.y - 3), pos.y + 3)
      .join("\n");
    log.debug(visualized);
  }
  throw e;
}
