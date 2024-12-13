import { log } from "../logger";
import type { GardenPlot } from "./findPlot";
import { findPlots } from "./findPlot";

function getPlotPrice(plot: GardenPlot) {
  return plot.area * plot.perimeter;
}

export function partA(map: string[]) {
  const plots = findPlots(map);

  // DEBUG
  for (const plot of plots) log.debug(plot);

  return plots.reduce((sum, plot) => sum + getPlotPrice(plot), 0);
}
