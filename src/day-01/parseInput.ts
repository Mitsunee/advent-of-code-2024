import { splitInputByLine } from "../shared/splitInputByLine";

export type PuzzleInput = [number, number][];

export function parseInput(input: string) {
  const lines = splitInputByLine(input);
  return lines.map(line => {
    const match = line.match(/^(?<a>\d+) +(?<b>\d+)$/);
    if (!match?.groups) throw new Error(`Could not parse input line: ${line}`);
    const out: PuzzleInput[0] = [
      Number(match.groups.a),
      Number(match.groups.b)
    ];

    if (isNaN(out[0]) || isNaN(out[1])) {
      throw new Error(`Could not parse input line: ${line}`);
    }

    return out;
  });
}
