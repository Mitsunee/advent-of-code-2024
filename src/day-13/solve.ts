import { log } from "../logger";
import type { ClawMachine } from "./parseInput";
import { solveMachine } from "./solveMachine";

export function solve(machines: ClawMachine[], isPartB: boolean) {
  let tokens = 0;

  for (const machine of machines) {
    let solution: ReturnType<typeof solveMachine> = undefined;

    if (isPartB) {
      throw new Error("Part B unimplemented");
      /*
      const modifiedMachine: ClawMachine = {
        ...machine,
        prizePos: { x: machine.prizePos.x + 1e13, y: machine.prizePos.y + 1e13 }
      };

      solution = solveMachine(modifiedMachine);
      */
    } else {
      solution = solveMachine(machine, 100);
    }

    if (!solution) continue;
    log.debug(`Final solution: ${solution}`);
    tokens += solution;
  }

  return tokens;
}
