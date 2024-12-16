import { List } from "@foxkit/list";
import type { Hitbox } from "./types";

export function mergeHitboxes(hitboxes: Hitbox[]) {
  const queue = new List(
    hitboxes.toSorted((a, b) => {
      if (a[0] == b[0]) return a[1] - b[1];
      return a[0] - b[0];
    })
  );
  const merged = new Array<Hitbox>();
  let temp: Hitbox | undefined;

  while ((temp = queue.shift())) {
    const start = temp[0];
    let end = temp[1];
    while (queue.head && queue.head[0] <= end + 1) {
      end = queue.head[1];
      queue.shift();
    }
    merged.push([start, end]);
  }
  return merged;
}
