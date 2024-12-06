export interface Position {
  x: number;
  y: number;
}

export interface MapBounds {
  height: number;
  width: number;
}

export function createBoundsChecker(max: MapBounds) {
  return (pos: Position) => {
    return !(pos.x < 0 || pos.y < 0 || pos.x > max.width || pos.y > max.height);
  };
}
