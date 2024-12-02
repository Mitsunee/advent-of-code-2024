import { log } from "../logger";
import type { PuzzleInput } from "./parseInput";
import { canBeDampened } from "./reportCanBeDampened";
import { reportIsSafe } from "./reportIsSafe";

export function partB(reports: PuzzleInput) {
  let safe = 0;

  for (const report of reports) {
    const reportStr = report.join(" ");

    if (reportIsSafe(report)) {
      safe++;
      log.debug(`${reportStr} (SAFE)`);
      continue;
    }

    if (canBeDampened(report)) {
      safe++;
      log.debug(`${reportStr} (SAFE, dampened)`);
      continue;
    }

    log.debug(`${reportStr} (UNSAFE)`);
  }

  return safe;
}
