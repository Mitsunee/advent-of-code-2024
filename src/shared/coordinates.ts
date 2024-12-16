export interface Position {
  x: number;
  y: number;
}
export type PositionStr = ReturnType<typeof positionToString>;

/**
 * Converts Position object to standardized string representation
 * @param pos Position
 * @returns Position as string
 */
export function positionToString(pos: Position) {
  return `[${pos.x},${pos.y}]` as const;
}

/**
 * Checks if string is valid PositionStr (string representation of Position)
 * @param str String
 * @returns boolean
 */
export function stringIsPosition(str: string): str is PositionStr {
  return /\[\d+,\d+\]/.test(str);
}

/**
 * Recreates Position object from string representation
 * @param str String
 * @returns Position Object
 */
export function stringToPosition(str: PositionStr) {
  const [xStr, yStr] = str.slice(1, -1).split(",");
  const pos: Position = { x: Number(xStr), y: Number(yStr) };
  if (isNaN(pos.x) || isNaN(pos.y)) {
    throw new Error(`Could not create Position from string: '${str}'`);
  }
  return pos;
}

export interface Direction extends Position {
  direction: "up" | "right" | "down" | "left";
}

export type DirectionStr = ReturnType<typeof directionToString>;

export const directionMovement: Record<Direction["direction"], Position> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }
};

export const directionArrow: Record<Direction["direction"], string> = {
  up: "↑",
  right: "→",
  down: "↓",
  left: "←"
};

/**
 * Converts Direction object to standardized string representation
 * @param pos Direction
 * @returns Direction as string
 */
export function directionToString(pos: Direction) {
  return `[${pos.x},${pos.y},${pos.direction}]` as const;
}

function dirStrIsValid(dirStr: string): dirStr is Direction["direction"] {
  return (
    dirStr == "up" || dirStr == "right" || dirStr == "down" || dirStr == "left"
  );
}

/**
 * Recreates Direction object from string representation
 * @param str String
 * @returns Direction Object
 */
export function stringToDirection(str: DirectionStr) {
  const [xStr, yStr, dir] = str.slice(1, -1).split(",");
  if (!dirStrIsValid(dir)) {
    throw new Error(`Could not create Direction from string: '${str}'`);
  }

  const pos: Direction = { x: Number(xStr), y: Number(yStr), direction: dir };
  if (isNaN(pos.x) || isNaN(pos.y)) {
    throw new Error(`Could not create Direction from string: '${str}'`);
  }

  return pos;
}
