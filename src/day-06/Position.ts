import type { Position } from "../shared/createBoundsChecker";
import type { Direction } from "./Direction";

export interface GuardPosition extends Position {
  direction: Direction;
}

export function posToCoordStr(pos: GuardPosition) {
  return `[${pos.x},${pos.y}]` as const;
}

export type PosStr = ReturnType<typeof posToCoordStr>;
