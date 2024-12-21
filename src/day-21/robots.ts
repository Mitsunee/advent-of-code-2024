import type { Directions, Position } from "../shared/coordinates";

export interface RobotOpts {
  keypad: string[];
  onMove(dir: Directions | "press"): void;
}

export type Robot = ReturnType<typeof createRobot>;

function findCoords(str: string, keypad: string[], errorMsg: string) {
  const target: Position = { x: -1, y: -1 };
  for (let y = 0; y < keypad.length; y++) {
    for (let x = 0; x < keypad[y].length; x++) {
      if (keypad[y][x] != str) continue;
      Object.assign(target, { x, y });
      break;
    }
  }

  if (target.x < 0 || target.y < 0) {
    throw new Error(errorMsg);
  }

  return target;
}

function findPathDiff(start: Position, end: Position) {
  const diff: Position = { x: end.x - start.x, y: end.y - start.y };
  return diff;
}

export function createRobot({ keypad, onMove }: RobotOpts) {
  const pos = findCoords("A", keypad, "Could not find A Button");

  function pressBtn(str: string) {
    const target = findCoords(str, keypad, `Could not find ${str} Button`);
    const badPos = findCoords("#", keypad, "Could not find bad coordinate");
    const diff = findPathDiff(pos, target);

    // horizontal asap if moving right
    if (pos.y != badPos.y || diff.x > 0) {
      // up
      while (diff.y < 0) {
        pos.y--;
        diff.y++;
        onMove("up");
      }

      // down
      while (diff.y > 0) {
        pos.y++;
        diff.y--;
        onMove("down");
      }
    }

    // right
    while (diff.x > 0) {
      if (keypad[pos.y][pos.x + 1] == "#") break;
      pos.x++;
      diff.x--;
      onMove("right");
    }

    // left asap
    if (pos.x != badPos.x) {
      while (diff.x < 0) {
        pos.x--;
        diff.x++;
        onMove("left");
      }
    }

    // up
    while (diff.y < 0) {
      if (keypad[pos.y - 1][pos.x] == "#") {
        throw new Error("did not expect to hit the empty space here");
      }
      pos.y--;
      diff.y++;
      onMove("up");
      if (diff.x < 0) break;
    }

    // down
    while (diff.y > 0) {
      if (keypad[pos.y + 1][pos.x] == "#") {
        throw new Error("did not expect to hit the empty space here");
      }
      pos.y++;
      diff.y--;
      onMove("down");
      if (diff.x < 0) break;
    }

    // left
    while (diff.x < 0) {
      if (keypad[pos.y][pos.x - 1] == "#") {
        throw new Error("did not expect to hit the empty space here");
      }
      pos.x--;
      diff.x++;
      onMove("left");
    }

    onMove("press");
  }

  return pressBtn;
}
