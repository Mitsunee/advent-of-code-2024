import type { Position } from "./coordinates";

export interface MapBounds {
  height: number;
  width: number;
}

export function getMapBounds<T = string>(map: string[] | T[][]) {
  const bounds: MapBounds = {
    height: map.length - 1,
    width: map[0].length - 1
  };

  return bounds;
}

export function createBoundsChecker(max: MapBounds) {
  return (pos: Position) => {
    return !(pos.x < 0 || pos.y < 0 || pos.x > max.width || pos.y > max.height);
  };
}
