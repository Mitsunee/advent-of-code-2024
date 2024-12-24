import { mapConnections } from "./mapConnections";
import type { PuzzleInput } from "./parseInput";

export function partA(connections: PuzzleInput) {
  const connectionMap = mapConnections(connections);
  const result = new Set<string>();

  // find triplets
  const computers = Object.values(connectionMap);
  for (const connection of connections) {
    if (!connection.some(name => name.startsWith("t"))) continue;
    const a = connectionMap[connection[0]];
    const b = connectionMap[connection[1]];
    const partners = computers.filter(
      computer =>
        computer.connectsTo.includes(a.name) &&
        computer.connectsTo.includes(b.name)
    );

    for (const c of partners) {
      const pairing = [a.name, b.name, c.name].sort();
      result.add(pairing.join(","));
    }
  }

  return result.size;
}
