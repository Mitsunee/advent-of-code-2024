import type { PuzzleInput } from "./parseInput";

export interface Computer {
  name: string;
  connectsTo: string[];
}

export function mapConnections(connections: PuzzleInput) {
  const connectionMap: Record<string, Computer> = {};

  // map all connections
  for (const [a, b] of connections) {
    (connectionMap[a] ||= { name: a, connectsTo: [] }).connectsTo.push(b);
    (connectionMap[b] ||= { name: b, connectsTo: [] }).connectsTo.push(a);
  }

  return connectionMap;
}
