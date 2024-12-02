import { log } from "../logger";
import type { InputLine } from "./parseInput";
import { reportIsSafe } from "./reportIsSafe";

export function canBeDampened(line: InputLine) {
  log.debug(`Trying to dampen report: ${line.join(" ")}`);

  // try without start
  if (reportIsSafe(line.slice(1))) {
    log.debug(`Report is safe without start`);
    return true;
  }

  // try without values inbetween
  const end = line.length - 1;
  for (let i = 1; i < end; i++) {
    const left = line.slice(0, i);
    const right = line.slice(i + 1);
    const replaced = left.concat(right);
    if (reportIsSafe(replaced)) {
      log.debug(`Report is safe without index ${i}`);
      return true;
    }
  }

  // try without start
  if (reportIsSafe(line.slice(0, -1))) {
    log.debug(`Report is safe without end`);
    return true;
  }

  // nothing worked
  log.debug(`Could not dampen report`);
  return false;
}
