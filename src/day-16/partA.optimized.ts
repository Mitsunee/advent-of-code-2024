import { createColors } from "picocolors";
import { log, logger } from "../logger";
import type { Direction, DirectionStr } from "../shared/coordinates";
import {
  directionArrow,
  directionMovement,
  directionToString,
  stringToDirection
} from "../shared/coordinates";
import type { PuzzleInput } from "./parseInput";
import { List } from "@foxkit/list";

const col = createColors(process.stdout?.hasColors?.()); // Dear picocolors, pls fix

interface MazePath {
  visited: Set<DirectionStr>;
  score: number;
  pos: Direction;
}

export function partA({ start, end, map }: PuzzleInput) {
  let cheapestCompleted: MazePath = {
    score: Infinity,
    pos: { ...start, direction: "right" },
    visited: new Set()
  };

  function visualizePath(path: MazePath) {
    if (logger.getLogLevel() != "Debug") return;
    const visualizedMap = map.map(row => row.split(""));
    for (const dirStr of path.visited) {
      const pos = stringToDirection(dirStr);
      visualizedMap[pos.y][pos.x] = col.bgRed(directionArrow[pos.direction]);
    }
    log.debug(visualizedMap.map(row => row.join("")).join("\n"));
  }

  function getDirections(pos: Direction): Array<Direction["direction"]> {
    const directions = new Array<Direction["direction"]>();

    // check up
    if (pos.direction != "down") {
      const char = map[pos.y - 1][pos.x];
      if (char == "E") return ["up"];
      if (char == ".") directions.push("up");
    }
    // check right
    if (pos.direction != "left") {
      const char = map[pos.y][pos.x + 1];
      if (char == "E") return ["right"];
      if (char == ".") directions.push("right");
    }
    // check down
    if (pos.direction != "up") {
      const char = map[pos.y + 1][pos.x];
      if (char == "E") return ["down"];
      if (char == ".") directions.push("down");
    }
    // check left
    if (pos.direction != "right") {
      const char = map[pos.y][pos.x - 1];
      if (char == "E") return ["left"];
      if (char == ".") directions.push("left");
    }

    return directions;
  }

  function exploreDirection(path: MazePath) {
    const nextPos: Direction = {
      x: path.pos.x + directionMovement[path.pos.direction].x,
      y: path.pos.y + directionMovement[path.pos.direction].y,
      direction: path.pos.direction
    };
    const nextPosStr = directionToString(nextPos);
    if (map[nextPos.y][nextPos.x] == "#") return []; // hit a wall
    if (map[nextPos.y][nextPos.x] == "E") {
      const newPath: MazePath = {
        pos: nextPos,
        score: path.score + 1,
        visited: new Set(path.visited)
      };
      newPath.visited.add(nextPosStr);
      return [newPath]; // hit end
    }
    if (path.visited.has(nextPosStr)) return []; // looped into known path

    const directions = getDirections(nextPos);
    return directions.map(direction => {
      const newPath: MazePath = {
        pos: Object.assign({}, nextPos, { direction }),
        score: path.score + 1 + (direction == path.pos.direction ? 0 : 1000),
        visited: new Set(path.visited)
      };
      newPath.visited.add(directionToString(newPath.pos));
      return newPath;
    });
  }

  const pathQueue = new List<MazePath>([
    {
      pos: { ...start, direction: "up" },
      score: 1000,
      visited: new Set([directionToString({ ...start, direction: "up" })])
    },
    {
      pos: { ...start, direction: "right" },
      score: 0,
      visited: new Set([directionToString({ ...start, direction: "right" })])
    }
  ]);

  let currentPath: MazePath | undefined;

  while ((currentPath ||= pathQueue.shift())) {
    const paths = exploreDirection(currentPath);
    const firstPath = paths.pop();

    // all paths ended
    if (!firstPath) {
      log.debug("Hit a deadend");
      currentPath = undefined;
      continue;
    }

    // append all the other ones
    paths.forEach(path => pathQueue.push(path));

    // handle firstPath
    if (firstPath.score > cheapestCompleted.score) {
      // path got to expensive, abandon
      log.debug("Current Path got too expensive");
      currentPath = undefined;
      continue;
    }

    if (firstPath.pos.x == end.x && firstPath.pos.y == end.y) {
      // hit end, compare score, then continue with next path
      if (firstPath.score < cheapestCompleted.score) {
        cheapestCompleted = firstPath;
        log.debug(`Found new cheapest path with score of ${firstPath.score}`);
      } else {
        log.debug("Path ended, not new cheapest path");
      }
      currentPath = undefined;
      continue;
    }

    currentPath = firstPath; // continue with this path
    log.debug(
      `Current path is scored ${currentPath.score} with length ${currentPath.visited.size}, queued paths: ${pathQueue.length}, added ${paths.length} more`
    );
  }

  visualizePath(cheapestCompleted);

  return cheapestCompleted.score;
}
