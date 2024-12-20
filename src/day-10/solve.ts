import { log, logger } from "../logger";
import { col } from "../shared/color";
import type { Position, PositionStr } from "../shared/coordinates";
import { positionToString } from "../shared/coordinates";
import { findTrailHeads } from "./findTrailHeads";
import { createTrailPathFinder } from "./trailPathFinder";

const hasColors = process.stdout?.hasColors?.();

function filterPaths(paths: Position[][]) {
  // Filter by unique end position
  const filteredPaths: typeof paths = [];
  const visitedEndPositions = new Set<PositionStr>();
  for (const path of paths) {
    const lastPos = positionToString(path[path.length - 1]);
    if (visitedEndPositions.has(lastPos)) continue;
    filteredPaths.push(path);
    visitedEndPositions.add(lastPos);
  }

  return filteredPaths;
}

function _debug_visualizePaths(paths: Position[][], map: string[]) {
  if (!hasColors || logger.getLogLevel() != "Debug") return;
  for (const path of paths) {
    const coords = new Set(path.map(pos => positionToString(pos)));
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const char = map[y][x];
        if (!coords.has(positionToString({ x, y }))) {
          process.stdout.write(char);
          continue;
        }
        switch (char) {
          case "0":
            process.stdout.write(col.bgGreen(col.black(char)));
            break;
          case "9":
            process.stdout.write(col.bgYellow(col.black(char)));
            break;
          default:
            process.stdout.write(col.bgCyan(col.black(char)));
        }
      }
      process.stdout.write("\n");
    }
    process.stdout.write("\n");
  }
}

export function solve(map: string[], isPartB: boolean) {
  let sum = 0;
  const findTrailPaths = createTrailPathFinder(map);

  for (const pos of findTrailHeads(map)) {
    log.debug(`Finding Paths from ${positionToString(pos)}`);
    const paths = findTrailPaths(pos);
    log.debug(`Found ${paths.length} paths`);

    // Part B doesn't care if there's paths going to the same destination
    if (isPartB) {
      sum += paths.length;
      continue;
    }

    // Filter by unique destination
    const filteredPaths = filterPaths(paths);
    log.debug(`Found ${filteredPaths.length} paths after filtering`);
    _debug_visualizePaths(filteredPaths, map);

    sum += filteredPaths.length;
  }

  return sum;
}
