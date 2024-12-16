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

const col = createColors(process.stdout?.hasColors?.()); // Dear picocolors, pls fix

function visualizePath(path: Array<DirectionStr>, map: string[]) {
  if (logger.getLogLevel() != "Debug") return;
  const visualizedMap = map.map(row => row.split(""));
  for (const dirStr of path) {
    const pos = stringToDirection(dirStr);
    visualizedMap[pos.y][pos.x] = col.bgRed(directionArrow[pos.direction]);
  }
  log.debug(visualizedMap.map(row => row.join("")).join("\n"));
}

export function partA({ start, map }: PuzzleInput) {
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

  function exploreDirection(
    previousPath: Array<DirectionStr>
  ): Array<DirectionStr[]> {
    const pos = stringToDirection(previousPath[previousPath.length - 1]);
    const nextPos: Direction = {
      x: pos.x + directionMovement[pos.direction].x,
      y: pos.y + directionMovement[pos.direction].y,
      direction: pos.direction
    };
    const nextPosStr = directionToString(nextPos);
    if (map[nextPos.y][nextPos.x] == "#") return []; // hit a wall
    if (map[nextPos.y][nextPos.x] == "E") {
      return [previousPath.concat(nextPosStr)]; // hit end
    }
    if (previousPath.includes(nextPosStr)) return []; // looped into known path

    const directions = getDirections(nextPos);
    const paths = directions.map(direction =>
      previousPath.concat(
        directionToString(Object.assign({}, nextPos, { direction }))
      )
    );

    return paths.map(path => exploreDirection(path)).flat();
  }

  const completedPaths = [
    exploreDirection([directionToString({ ...start, direction: "up" })]),
    exploreDirection([directionToString({ ...start, direction: "right" })]),
    exploreDirection([directionToString({ ...start, direction: "down" })]),
    exploreDirection([directionToString({ ...start, direction: "left" })])
  ].flat();

  // DEBUG
  log.debug(`Completed Paths: ${completedPaths.length}`);

  // score paths
  let cheapestCompleted = Infinity;
  let cheapestCompletedPath = new Array<DirectionStr>();
  for (const path of completedPaths) {
    const first = stringToDirection(path[0]);
    let score = 0;
    let prevDirection = first.direction;
    if (first.direction != "right") score += 1000;

    for (let i = 1; i < path.length; i++) {
      score++;
      const pos = stringToDirection(path[i]);
      if (pos.direction != prevDirection) {
        score += 1000;
        prevDirection = pos.direction;
      }

      if (score > cheapestCompleted) break;
    }

    if (score < cheapestCompleted) {
      cheapestCompleted = score;
      cheapestCompletedPath = path;
    }
  }

  visualizePath(cheapestCompletedPath, map);

  return cheapestCompleted; // TODO
}
