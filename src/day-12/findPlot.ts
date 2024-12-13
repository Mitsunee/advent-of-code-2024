import { log } from "../logger";
import type { PositionStr, Position } from "../shared/coordinates";
import { positionToString } from "../shared/coordinates";
import {
  createBoundsChecker,
  getMapBounds
} from "../shared/createBoundsChecker";

export interface GardenPlot {
  char: string;
  area: number;
  perimeter: number;
  coords: Set<PositionStr>;
}

const directions: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
];

function createFindPlot(map: string[]) {
  const checkBounds = createBoundsChecker(getMapBounds(map));

  return function findGroup(pos: Position) {
    const char = map[pos.y][pos.x];
    const ownedCoords = new Set<PositionStr>();
    let perimeter = 0;

    function find(pos: Position) {
      ownedCoords.add(positionToString(pos));
      for (const direction of directions) {
        const nextPos: Position = {
          x: pos.x + direction[0],
          y: pos.y + direction[1]
        };
        const nextPosStr = positionToString(nextPos);

        // check that next pos is not already known
        if (ownedCoords.has(nextPosStr)) continue;

        // check that next pos is not out of bounds
        if (!checkBounds(nextPos)) {
          perimeter++;
          continue;
        }

        // recursively pathfind if it is a new Position part of this plot
        if (map[nextPos.y][nextPos.x] === char) {
          find(nextPos);
          continue;
        }

        // found edge of plot, add to perimeter
        perimeter++;
      }
    }

    find(pos);
    const plot: GardenPlot = {
      char,
      area: ownedCoords.size,
      perimeter,
      coords: ownedCoords
    };

    return plot;
  };
}

export function findPlots(map: string[]) {
  const visitedCoords = new Set<PositionStr>();
  const plots = new Array<GardenPlot>();
  const findPlot = createFindPlot(map);

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const pos: Position = { x, y };
      const posStr = positionToString(pos);
      if (visitedCoords.has(posStr)) continue;
      const plot = findPlot(pos);
      plot.coords.forEach(coord => visitedCoords.add(coord));
      plots.push(plot);
    }
  }

  // DEBUG
  log.debug(`Found ${plots.length} plots`);

  return plots;
}
