import type { Hitbox, HitboxMap } from "./types";

export function getNextHitboxes(hitbox: Hitbox, row: string) {
  const newHitboxes: HitboxMap[number] = [];
  let temp = -1;

  // if box starts left to hitbox set temp var early
  if (row[hitbox[0] - 1] == "[") temp = hitbox[0] - 1;

  for (let x = hitbox[0]; x <= hitbox[1]; x++) {
    if (row[x] == "#") return false;
    if (temp >= 0 && row[x] == ".") {
      newHitboxes.push([temp, x - 1]);
      temp = -1;
      continue;
    }
    if (temp < 0 && row[x] == "[") {
      temp = x;
    }
  }

  if (temp >= 0) {
    let stop = hitbox[1];
    if (row[hitbox[1]] == "[") stop++;
    newHitboxes.push([temp, stop]);
  }

  return newHitboxes;
}
