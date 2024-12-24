import { splitInputByLine } from "../shared/splitInputByLine";

export type Connection = [string, string];

export type PuzzleInput = ReturnType<typeof parseInput>;

function isValid(connections: string[][]): connections is Array<Connection> {
  return connections.every(connection => connection.length == 2);
}

export function parseInput(input: string) {
  const lines = splitInputByLine(input);
  const connections = lines.map(line => line.split("-"));
  if (!isValid(connections)) {
    throw new Error("Could not parse input file");
  }

  return connections;
}
