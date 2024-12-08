import type { Position, PositionStr } from "../shared/coordinates";
import { positionToString } from "../shared/coordinates";
import type { Direction } from "./Direction";

export interface GuardPosition extends Position {
  direction: Direction;
}

export function posToCoordStr(pos: GuardPosition) {
  return positionToString(pos);
}

export type PosStr = PositionStr;
