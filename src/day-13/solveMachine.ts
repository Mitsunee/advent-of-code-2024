import { log } from "../logger";
import type { Position } from "../shared/coordinates";
import type { ClawMachine } from "./parseInput";

export function solveMachine(machine: ClawMachine, max = Infinity) {
  // get maximum possible presses of both buttons
  const aMax = Math.min(
    max,
    Math.floor(machine.prizePos.x / machine.a.x),
    Math.floor(machine.prizePos.y / machine.a.y)
  );
  const bMax = Math.min(
    max,
    Math.floor(machine.prizePos.x / machine.b.x),
    Math.floor(machine.prizePos.y / machine.b.y)
  );

  let bestSolution = Infinity;

  for (let a = 0; a <= aMax; a++) {
    for (let b = 0; b <= bMax; b++) {
      const pos: Position = {
        x: machine.a.x * a + machine.b.x * b,
        y: machine.a.y * a + machine.b.y * b
      };

      if (pos.x < machine.prizePos.x || pos.y < machine.prizePos.y) continue;
      if (pos.x > machine.prizePos.x || pos.y > machine.prizePos.y) break;
      if (pos.x == machine.prizePos.x && pos.y == machine.prizePos.y) {
        const solution = a * 3 + b;
        if (solution < bestSolution) {
          log.debug(`Found new best solution at ${solution}`);
          bestSolution = solution;
        }
      }
    }
  }

  if (bestSolution === Infinity) {
    log.debug(`Found no solution for machine`);
    return;
  }
  return bestSolution;
}
