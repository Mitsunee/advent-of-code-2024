import { log } from "../logger";
import type { Position } from "../shared/coordinates";
import { positionToString, stringToPosition } from "../shared/coordinates";
import type { GardenPlot } from "./findPlot";
import { findPlots } from "./findPlot";

type Direction = "up" | "right" | "down" | "left";

function indexPlotEdges(plot: GardenPlot) {
  const coords = Array.from(plot.coords, str => stringToPosition(str));
  const edges = new Array<[Position, Direction]>();

  for (const { x, y } of coords) {
    if (!plot.coords.has(positionToString({ x, y: y - 1 }))) {
      edges.push([{ x, y }, "up"]);
    }
    if (!plot.coords.has(positionToString({ x: x + 1, y }))) {
      edges.push([{ x, y }, "right"]);
    }
    if (!plot.coords.has(positionToString({ x, y: y + 1 }))) {
      edges.push([{ x, y }, "down"]);
    }
    if (!plot.coords.has(positionToString({ x: x - 1, y }))) {
      edges.push([{ x, y }, "left"]);
    }
  }

  log.debug(`Found ${edges.length} coordinate+edge pairs`);

  return edges;
}

function findNeighbour(pos: Position, dir: Direction) {
  return ([neighbourPos, neighbourDir]: [Position, Direction]) => {
    return (
      neighbourDir == dir && neighbourPos.x == pos.x && neighbourPos.y == pos.y
    );
  };
}

/**
 * This is probably a really stupid way to do this, but I'm kinda proud that I
 * got this to work at all
 * @param plot GardenPlot object
 * @param map puzzle input reference
 * @returns Amount of edges the garden plot has
 */
function getPlotEdges(plot: GardenPlot, map: string[]) {
  let coordsWithEdges = indexPlotEdges(plot);
  let edges = 0;
  let temp: undefined | (typeof coordsWithEdges)[0];

  log.debug({ coordsWithEdges });

  // pop off one coordinate and find its neighbours along the same edge
  while ((temp = coordsWithEdges.pop())) {
    edges++;
    const [pos, direction] = temp;
    // keep track of neighbours their indexes in a mask for now, filter at the end:
    const mask = Array.from({ length: coordsWithEdges.length }, () => true);
    log.debug(
      `Looking for neighbours of ${positionToString(pos)} along edge '${direction}'`
    );

    // check for neighbours along edge
    if (direction == "left" || direction == "right") {
      // vertical edge
      log.debug("Edge is vertical");
      // check for neighbours up
      for (let y = pos.y - 1; y >= 0; y--) {
        log.debug(`Checking [${pos.x},${y}] along edge '${direction}'`);
        const neighbour = coordsWithEdges.findIndex(
          findNeighbour({ x: pos.x, y }, direction)
        );
        log.debug(`Resulting index: ${neighbour}`);
        if (neighbour < 0) break; // didn't find one, break
        mask[neighbour] = false; // found one, set in mask
      }
      // check for neighbours down
      for (let y = pos.y + 1; y < map.length; y++) {
        log.debug(`Checking [${pos.x},${y}] along edge '${direction}'`);
        const neighbour = coordsWithEdges.findIndex(
          findNeighbour({ x: pos.x, y }, direction)
        );
        log.debug(`Resulting index: ${neighbour}`);
        if (neighbour < 0) break; // didn't find one, break
        mask[neighbour] = false; // found one, set in mask
      }
    } else {
      // horizontal edge
      log.debug("Edge is horizontal");
      // check for neighbours right
      for (let x = pos.x + 1; x < map[pos.y].length; x++) {
        log.debug(`Checking [${x},${pos.y}] along edge '${direction}'`);
        const neighbour = coordsWithEdges.findIndex(
          findNeighbour({ x, y: pos.y }, direction)
        );
        log.debug(`Resulting index: ${neighbour}`);
        if (neighbour < 0) break; // didn't find one, break
        mask[neighbour] = false; // found one, set in mask
      }
      // check for neighbour left
      for (let x = pos.x - 1; x >= 0; x--) {
        log.debug(`Checking [${x},${pos.y}] along edge '${direction}'`);
        const neighbour = coordsWithEdges.findIndex(
          findNeighbour({ x, y: pos.y }, direction)
        );
        log.debug(`Resulting index: ${neighbour}`);
        if (neighbour < 0) break; // didn't find one, break
        mask[neighbour] = false; // found one, set in mask
      }
    }

    const totalNeighbours = mask.filter(v => !v).length;
    log.debug(`Found ${mask.filter(v => !v).length} neighbour(s)`);
    if (totalNeighbours < 1) continue; // mask won't do anything, continue early

    // apply mask
    log.debug(`Pairs left before applying mask: ${coordsWithEdges.length}`);
    coordsWithEdges = coordsWithEdges.filter((_, idx) => mask[idx]);
    log.debug(`Pairs left after applying mask: ${coordsWithEdges.length}`);
  }

  return edges;
}

export function partB(map: string[]) {
  const plots = findPlots(map);
  let sum = 0;

  for (const plot of plots) {
    log.debug(plot);
    const edges = getPlotEdges(plot, map);
    const price = edges * plot.area;
    log.debug(`Found total of ${edges} edges, total price: ${price}`);
    sum += price;
  }

  return sum;
}
