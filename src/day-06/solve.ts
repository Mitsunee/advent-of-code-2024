import { log } from "../logger";
import { createBoundsChecker } from "../shared/createBoundsChecker";
import { Direction, getNextDirection } from "./Direction";
import { getNextPos } from "./getNextPos";
import { getStartingPos } from "./getStartingPos";
import type { GuardPosition, PosStr } from "./Position";
import { posToCoordStr } from "./Position";
import { simulateObstacle } from "./simulateObstacle";

export function solve(map: string[], isPartB: boolean) {
  const checkBounds = createBoundsChecker({
    height: map.length - 1,
    width: map[0].length - 1
  });
  const obstaclePositions = new Set<PosStr>();
  const visitedCoords = new Set<PosStr>();
  const pos: GuardPosition = getStartingPos(map);
  log.debug(`Found starting position at ${posToCoordStr(pos)}`);

  while (checkBounds(pos)) {
    const posStr = posToCoordStr(pos);
    visitedCoords.add(posStr);
    log.debug(
      `Current coordinates: ${posStr}, going ${Direction[pos.direction]}`
    );

    // determine next position
    const nextPos = getNextPos(pos);
    const nextPosStr = posToCoordStr(nextPos);
    log.debug(`Determined next position to be: ${nextPosStr}`);

    // check that coordinate is inbounds
    if (!checkBounds(nextPos)) {
      log.debug(`Coordinate not valid or has been visited before`);
      break;
    }

    // check if there's a coordinate at the obstacle
    if (map[nextPos.y][nextPos.x] == "#") {
      // turn and continue at same position
      log.debug("Found obstacle at that position, changing direction");
      pos.direction = getNextDirection(pos.direction);
      continue;
    }

    // (PART B ONLY) Simulate an obstacle at the next position
    // (unless it's the starting pos or previously visited)
    if (
      isPartB &&
      map[nextPos.y][nextPos.x] != "^" &&
      !visitedCoords.has(nextPosStr)
    ) {
      if (
        simulateObstacle({ map, pos, obstaclePosition: nextPos, checkBounds })
      ) {
        log.debug(`Found position where obstacle causes loop at ${nextPosStr}`);
        obstaclePositions.add(nextPosStr);
      }
    }

    // apply new position
    Object.assign(pos, nextPos);
  }

  return isPartB ? obstaclePositions.size : visitedCoords.size;
}
