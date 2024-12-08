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
