import { log } from "../logger";
import { splitInputByLine } from "../shared/splitInputByLine";

export type PuzzleInput = ReturnType<typeof parseInput>;

function splitLine(line: string) {
  const [aS, bS] = line.split(",");
  const a = Number(aS);
  const b = Number(bS);

  if (isNaN(a) || isNaN(b)) {
    throw new Error(`Could not parse tuple: '${line}'`);
  }

  return [a, b] satisfies [number, number];
}

export function parseInput(input: string) {
  const lines = splitInputByLine(input);
  let width = 71;
  let height = 71;

  // search for size setting
  if (lines[0].startsWith("size=")) {
    const [, temp] = lines[0].split("=");
    [width, height] = splitLine(temp);
    lines.shift();
  }

  // DEBUG
  log.debug(`Input contains ${lines.length} memory locations`);

  return {
    map: Array.from({ length: height }, () => ".".repeat(width)),
    locations: lines.map(line => splitLine(line)),
    width,
    height
  };
}
