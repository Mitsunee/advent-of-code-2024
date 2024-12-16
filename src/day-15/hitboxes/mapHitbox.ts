import { log } from "../../logger";
import type { Position } from "../../shared/coordinates";
import { getNextHitboxes } from "./getNextHitboxes";
import { mergeHitboxes } from "./mergeHitboxes";
import type { Hitbox, HitboxMap } from "./types";

export function mapHitbox(pos: Position, diff: -1 | 1, map: string[]) {
  let emptyY = -1;

  // prepare hitbox map
  const hitboxMap: HitboxMap = Array.from(
    { length: map.length },
    () => new Array<Hitbox>()
  );
  hitboxMap[pos.y] = [[pos.x, pos.x]];

  // run collision detection
  for (let y = pos.y + diff; ; y += diff) {
    const hitboxes = hitboxMap[y - diff];
    const newHitboxes: typeof hitboxes = [];
    log.debug(`Checking row ${y} against ${hitboxes.length} hitboxes`);

    // check every hitbox from previous row
    for (const hitbox of hitboxes) {
      const nextHitboxes = getNextHitboxes(hitbox, map[y]);
      if (nextHitboxes === false) {
        log.debug("Movement not possible");
        return { emptyY: -1, hitboxMap };
      }
      nextHitboxes.forEach(hitbox => newHitboxes.push(hitbox));
    }

    // break if no more hitboxes found, since that means everything hit empty space
    if (newHitboxes.length < 1) {
      emptyY = y;
      log.debug(
        `End of hitboxes in row ${emptyY}, Movement confirmed possible:`
      );
      break;
    }

    // add result for this row to hitboxMap
    log.debug(`Found ${newHitboxes.length} hitboxes`);
    hitboxMap[y] = mergeHitboxes(newHitboxes);
  }

  return { emptyY, hitboxMap };
}
