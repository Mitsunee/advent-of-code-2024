import { createColors } from "picocolors";
import { log, logger } from "../../logger";
import type { HitboxMap } from "./types";

const col = createColors(process.stdout?.hasColors?.()); // Dear picocolors, pls fix

export function visualizeHitboxes(hitboxMap: HitboxMap, map: string[]) {
  if (logger.getLogLevel() != "Debug") return;

  let visualized = "";

  for (let y = 0; y < map.length; y++) {
    const hitboxes = hitboxMap[y];
    const row = map[y];
    if (hitboxes.length < 1) {
      visualized += `${row}\n`;
      continue;
    }

    for (let x = 0; x < map[y].length; x++) {
      visualized += hitboxes.some(([start, stop]) => start <= x && stop >= x)
        ? col.bgRed(row[x])
        : row[x];
    }
    visualized += "\n";
  }

  log.debug(visualized);
}
