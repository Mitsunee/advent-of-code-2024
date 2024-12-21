import { log } from "../logger";
import { directionArrow } from "../shared/coordinates";
import type { Robot } from "./robots";
import { createRobot } from "./robots";

const codeKeypad = ["789", "456", "123", "#0A"];
const moveKeypad = ["#↑A", "←↓→"];

function enterCode(code: string) {
  let solution = "";
  let robot: Robot | undefined = undefined;

  for (let i = 0; i < 25; i++) {
    const prevRobot = robot;
    const nextRobot = createRobot({
      keypad: moveKeypad,
      onMove: prevRobot
        ? direction =>
            prevRobot(direction == "press" ? "A" : directionArrow[direction])
        : direction => {
            solution += direction == "press" ? "A" : directionArrow[direction];
          }
    });
    robot = nextRobot;
  }

  const codeBot = createRobot({
    keypad: codeKeypad,
    onMove: direction => {
      robot!(direction == "press" ? "A" : directionArrow[direction]);
    }
  });

  // enter code
  for (const char of code) {
    log.debug(`Entering character: ${char}`);
    codeBot(char);
  }

  return solution;
}

export function partB(codes: string[]) {
  let totalComplexity = 0;

  for (const code of codes) {
    log.debug(`Entering code '${code}'`);
    const solution = enterCode(code);
    const complexity = solution.length * parseInt(code);
    log.debug({ length: solution.length, complexity });
    log.debug(solution);
    totalComplexity += complexity;
  }

  return totalComplexity;
}
