import type { Position } from "../shared/coordinates";

export function findNodes(map: string[]) {
  const nodeMap: Record<string, Position[]> = {};

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const char = map[y][x];
      if (!/[a-z0-9]/i.test(char)) continue;
      nodeMap[char] ??= [];
      nodeMap[char].push({ x, y });
    }
  }

  const nodeTypes = new Set(Object.keys(nodeMap));

  // sort node list (theoretically they should already be sorted, just playing safe)
  for (const type of nodeTypes) {
    nodeMap[type].sort((a, b) => {
      if (a.x == b.x) {
        return a.y - b.y;
      }

      return a.x - b.x;
    });
  }

  return { nodeTypes, nodeMap };
}
