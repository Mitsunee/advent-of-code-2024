import { log, logger } from "../logger";
import type { PuzzleInput } from "./parseInput";

export function visualizeMap(input: PuzzleInput, msg?: string) {
  if (logger.getLogLevel() == "Debug") {
    const visualized = Array.from({ length: input.height }, () =>
      Array.from({ length: input.width }, () => 0)
    );
    input.robots.forEach(robot => visualized[robot.y][robot.x]++);
    log.debug(
      `${msg || ""}${msg ? "\n" : ""}${visualized
        .map(row => row.join(""))
        .join("\n")
        .replace(/0/g, ".")}`
    );
  }
}
