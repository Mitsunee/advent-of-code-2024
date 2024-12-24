import { mapConnections } from "./mapConnections";
import type { PuzzleInput } from "./parseInput";

export function partB(connections: PuzzleInput) {
  const connectionMap = mapConnections(connections);
  const computers = Object.values(connectionMap).sort(
    (a, b) => b.connectsTo.length - a.connectsTo.length
  );
  let largestSet = new Array<string>();

  for (let i = 0; i < computers.length; i++) {
    const computerA = computers[i];

    for (let j = 0; j < computers.length; j++) {
      if (j == i) continue;
      if (!computers[j].connectsTo.includes(computerA.name)) continue;
      const computerB = computers[j];
      const set = [computerA.name, computerB.name];

      for (let k = 0; k < computers.length; k++) {
        if (k == i || k == j) continue;
        const newComputer = computers[k];
        if (set.some(computer => !newComputer.connectsTo.includes(computer))) {
          continue;
        }
        set.push(newComputer.name);
      }

      if (set.length > largestSet.length) largestSet = set;
    }
  }

  return largestSet.sort().join(",");
}
