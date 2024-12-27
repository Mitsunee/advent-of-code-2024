import { log } from "../logger";
import { splitInputByLine } from "../shared/splitInputByLine";

export interface PuzzleInput {
  keys: number[][];
  locks: number[][];
}

export function parseInput(input: string): PuzzleInput {
  const groups = input.replace(/^\n+|\n+$/g, "").split("\n\n");
  const keys = new Array<number[]>();
  const locks = new Array<number[]>();

  for (const group of groups) {
    const lines = splitInputByLine(group).slice(1, -1);
    const values = new Array<number>(5).fill(0);
    for (const line of lines) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] == "#") values[i]++;
      }
    }
    if (group.startsWith("...")) {
      log.debug(`Found key with values '${values.join()}':\n${group}`);
      keys.push(values);
    } else {
      log.debug(`Found lock with values: '${values.join()}'\n${group}`);
      locks.push(values);
    }
  }

  return { keys, locks };
}
