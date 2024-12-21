import { log } from "../logger";
import { directionArrow } from "../shared/coordinates";
import { createRobot } from "./robots";

const codeKeypad = ["789", "456", "123", "#0A"];
const moveKeypad = ["#↑A", "←↓→"];

function enterCode(code: string) {
  let solution = "";

  const finalBot = createRobot({
    keypad: moveKeypad,
    onMove: direction => {
      solution += direction == "press" ? "A" : directionArrow[direction];
    }
  });

  const secondBot = createRobot({
    keypad: moveKeypad,
    onMove: direction => {
      finalBot(direction == "press" ? "A" : directionArrow[direction]);
    }
  });

  const codeBot = createRobot({
    keypad: codeKeypad,
    onMove: direction => {
      secondBot(direction == "press" ? "A" : directionArrow[direction]);
    }
  });

  // enter code
  for (const char of code) {
    log.debug(`Entering character: ${char}`);
    codeBot(char);
  }

  return solution;
}

export function partA(codes: string[]) {
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
