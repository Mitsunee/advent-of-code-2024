import { log, logger } from "../logger";
import { col } from "../shared/color";
import type { createBoundsChecker } from "../shared/createBoundsChecker";
import type { DirStr } from "./Direction";
import { directionArrows, getNextDirection, posToDirStr } from "./Direction";
import { getNextPos } from "./getNextPos";
import { posToCoordStr, type GuardPosition, type PosStr } from "./Position";

interface ObstacleSimulatorOpts {
  map: string[];
  pos: GuardPosition;
  obstaclePosition: GuardPosition;
  checkBounds: ReturnType<typeof createBoundsChecker>;
}

function writeObstacleToRow(row: string, x: number) {
  return `${row.slice(0, x)}#${row.slice(x + 1)}`;
}

function createSimulatedMap(map: string[], obstaclePosition: GuardPosition) {
  const row = writeObstacleToRow(map[obstaclePosition.y], obstaclePosition.x);
  return map.with(obstaclePosition.y, row);
}

/**
 * Simulates an obstacle and continues traversal. If the new path is a loop returns `true`
 * @param opts
 * @returns boolean, true if the obstacle caused a loop
 */
export function simulateObstacle(opts: ObstacleSimulatorOpts) {
  const map = createSimulatedMap(opts.map, opts.obstaclePosition);
  const visitedDirs = new Set<DirStr>();
  const pos = Object.assign({}, opts.pos);

  if (!map.some(row => row.includes("^"))) throw new Error("replaced start");

  while (opts.checkBounds(pos)) {
    visitedDirs.add(posToDirStr(pos));
    const nextPos = getNextPos(pos);

    // check that coordinate is inbounds
    if (!opts.checkBounds(nextPos)) return false; // left map, did not create loop

    // check if there's a coordinate at the obstacle
    if (map[nextPos.y][nextPos.x] == "#") {
      // turn and continue at same position
      pos.direction = getNextDirection(pos.direction);
      continue;
    }

    // apply next position
    Object.assign(pos, nextPos);

    // check if we looped yet
    const posStr = posToCoordStr(pos);
    if (visitedDirs.has(posToDirStr(pos))) {
      if (logger.getLogLevel() == "Debug") {
        // get all visited coords as set
        const visitedCoords = new Set(
          Array.from(visitedDirs, dir => dir.replace(/,.]$/, "]")) // looses narrow typing *shrug*
        );

        // retrace loop once more
        const loopCoords = new Set<PosStr>();
        const demoPos = Object.assign({}, pos);
        while (
          loopCoords.size < 1 ||
          demoPos.x != pos.x ||
          demoPos.y != pos.y ||
          demoPos.direction != pos.direction
        ) {
          loopCoords.add(posToCoordStr(demoPos));
          const nextPos = getNextPos(demoPos);
          if (!opts.checkBounds(nextPos)) {
            log.error(`Unexpected out of bounds read while retracing loop`);
            break;
          }
          if (map[nextPos.y][nextPos.x] == "#") {
            demoPos.direction = getNextDirection(demoPos.direction);
            continue;
          }
          Object.assign(demoPos, nextPos);
        }

        const visualizedMap = map
          .map((row, y) =>
            Array.from(row)
              .map((char, x) => {
                if (char == "^") return col.cyan("\u039b");
                const str = posToCoordStr({ x, y, direction: 0 });
                if (str === posStr) {
                  return col.yellow(directionArrows[pos.direction]);
                }
                if (loopCoords.has(str)) return col.magenta("*");
                if (visitedCoords.has(str)) return col.cyan("+");
                if (
                  opts.obstaclePosition.x == x &&
                  opts.obstaclePosition.y == y
                ) {
                  return "O";
                }
                return char;
              })
              .join("")
          )
          .join("\n");
        log.debug(visualizedMap);
      }

      return true;
    }
  }

  return false; // dunno if this ever happens, since I check bounds twice
}
