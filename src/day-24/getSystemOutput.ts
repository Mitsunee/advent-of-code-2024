import { log } from "../logger";
import type { PuzzleInput } from "./parseInput";

export function getSystemOutput(
  values: PuzzleInput["values"],
  prefix: "x" | "y" | "z",
  useLog = true
) {
  const outputs = Object.entries(values).filter(entry =>
    entry[0].startsWith(prefix)
  );

  if (useLog) {
    log.debug(`Found ${outputs.length} outputs starting with ${prefix}`);
  }

  const result = outputs
    .map(([key, val]) => [Number(key.slice(1)), val] as const)
    .sort((a, b) => b[0] - a[0])
    .map(entry => entry[1])
    .join("");

  if (useLog) log.debug(result);

  return Number(`0b${result}`);
}
