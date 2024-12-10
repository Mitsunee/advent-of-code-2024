import type { Position } from "../shared/coordinates";
import {
  createBoundsChecker,
  getMapBounds
} from "../shared/createBoundsChecker";

export function createTrailPathFinder(map: string[]) {
  const checkBounds = createBoundsChecker(getMapBounds(map));

  function findTrailPaths(pos: Position, targetVal = 0): Array<Position[]> {
    if (!checkBounds(pos)) return [];
    const currentVal = Number(map[pos.y][pos.x]);
    if (currentVal != targetVal) return [];
    if (currentVal >= 9) return [[pos]];

    // explore paths
    const paths: Array<Position[]> = [];
    const nextVal = currentVal + 1;
    const up = findTrailPaths({ x: pos.x, y: pos.y - 1 }, nextVal);
    const right = findTrailPaths({ x: pos.x + 1, y: pos.y }, nextVal);
    const down = findTrailPaths({ x: pos.x, y: pos.y + 1 }, nextVal);
    const left = findTrailPaths({ x: pos.x - 1, y: pos.y }, nextVal);
    const all = [...up, ...right, ...down, ...left];

    for (const path of all) {
      paths.push([pos, ...path]);
    }

    return paths;
  }

  return findTrailPaths;
}
