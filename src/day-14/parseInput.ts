import { log } from "../logger";
import type { Position } from "../shared/coordinates";
import { splitInputByLine } from "../shared/splitInputByLine";

export interface Robot extends Position {
  move: Position;
}

export interface PuzzleInput {
  robots: Array<Robot>;
  width: number;
  height: number;
}

function parseRobots(lines: string[]) {
  const robots = new Array<Robot>();

  for (const line of lines) {
    const match = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/);
    if (!match) throw new Error(`Could not parse robot: '${line}'`);
    robots.push({
      x: Number(match[1]),
      y: Number(match[2]),
      move: { x: Number(match[3]), y: Number(match[4]) }
    });
  }

  return robots;
}

export function parseInput(input: string): PuzzleInput {
  const lines = splitInputByLine(input);
  let width = 101;
  let height = 103;

  if (lines[0].startsWith("size=")) {
    const sizeLine = lines.shift()!;
    const match = sizeLine.match(/^size=(\d+),(\d+)/);
    if (!match) throw new Error(`Could not parse size: '${sizeLine}'`);
    width = Number(match[1]);
    height = Number(match[2]);
  } else {
    log.debug("Using default size");
  }

  log.debug(`Grid size: ${width}x${height}`);

  const robots = parseRobots(lines);

  return { width, height, robots };
}
