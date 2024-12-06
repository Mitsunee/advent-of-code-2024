import type { GuardPosition } from "./Position";

export enum Direction {
  "up",
  "right",
  "down",
  "left"
}

export function getNextDirection(direction: Direction) {
  return ((direction + 1) % 4) as Direction;
}

export const directionArrows = ["Λ", ">", "V", "<"] as const;

export function posToDirStr(pos: GuardPosition) {
  return `[${pos.x},${pos.y},${directionArrows[pos.direction]}]` as const;
}

export type DirStr = ReturnType<typeof posToDirStr>;
