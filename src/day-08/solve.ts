import { createColors } from "picocolors";
import { log, logger } from "../logger";
import type { PositionStr, Position } from "../shared/coordinates";
import { positionToString } from "../shared/coordinates";
import {
  createBoundsChecker,
  getMapBounds
} from "../shared/createBoundsChecker";
import { findNodes } from "./findNodes";

const col = createColors(process.stdout?.hasColors?.()); // Dear picocolors, pls fix

export function solve(map: string[], isPartB: boolean) {
  const { nodeTypes, nodeMap } = findNodes(map);
  const checkBounds = createBoundsChecker(getMapBounds(map));
  const antiNodes = new Set<PositionStr>();
  log.debug({ nodeTypes, nodeMap });

  // for every type of node
  for (const type of nodeTypes) {
    const nodes = nodeMap[type];

    // for every possible pair (sorted left-to-right, top-to-bottom)
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j]; // can be assumed to be somewhere below and/or right of nodeA
        const diff: Position = { x: nodeB.x - nodeA.x, y: nodeB.y - nodeA.y };

        if (isPartB) {
          // determine antinodes topleft from nodeA
          for (
            let anti = Object.assign({}, nodeA);
            checkBounds(anti);
            anti.x -= diff.x, anti.y -= diff.y
          ) {
            antiNodes.add(positionToString(anti));
          }

          // determine antinodes bottom right from nodeB
          for (
            let anti = Object.assign({}, nodeB);
            checkBounds(anti);
            anti.x += diff.x, anti.y += diff.y
          ) {
            antiNodes.add(positionToString(anti));
          }
        } else {
          // determine antinode positions
          const antiA: Position = { x: nodeA.x - diff.x, y: nodeA.y - diff.y };
          const antiB: Position = { x: nodeB.x + diff.x, y: nodeB.y + diff.y };

          // try to add to set
          if (checkBounds(antiA)) antiNodes.add(positionToString(antiA));
          if (checkBounds(antiB)) antiNodes.add(positionToString(antiB));
        }
      }
    }
  }

  if (logger.getLogLevel() == "Debug") {
    const visualized = map
      .map((row, y) => {
        let newRow = "";
        for (let x = 0; x < row.length; x++) {
          newRow += antiNodes.has(positionToString({ x, y }))
            ? col.bgCyan(col.black(row[x]))
            : row[x];
        }
        return newRow;
      })
      .join("\n");
    log.debug(visualized);
  }

  return antiNodes.size;
}
