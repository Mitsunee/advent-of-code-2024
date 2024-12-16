import { test } from "uvu";
import * as assert from "uvu/assert";
import { mergeHitboxes } from "./mergeHitboxes";

test("it merges hitboxes correctly", () => {
  // prettier-ignore
  assert.equal(
    mergeHitboxes([[3, 5], [4, 7]]),
    [[3, 7]],
    "simple merge"
  );

  // prettier-ignore
  assert.equal(
    mergeHitboxes([[3, 5], [9, 11], [6, 7]]),
    [[3, 7], [9, 11]],
    "merges sequential hitboxes without overlap"
  );
});

test.run();
