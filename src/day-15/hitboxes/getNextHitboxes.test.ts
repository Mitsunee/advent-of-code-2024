import { test } from "uvu";
import * as assert from "uvu/assert";
import { getNextHitboxes } from "./getNextHitboxes";

test("getNextHitboxes - moving normally", () => {
  const row1 = "#..[][][]..#";
  // control 1     ^^^^^^
  // control 2      ^^^^^
  // control 3     ^^^^^
  assert.equal(getNextHitboxes([3, 8], row1), [[3, 8]], "perfectly aligned");
  assert.equal(getNextHitboxes([4, 8], row1), [[3, 8]], "hitbox grows left");
  assert.equal(getNextHitboxes([3, 7], row1), [[3, 8]], "hitbox grows right");

  const row2 = "#..[].[].[]..#";
  // control 4     ^^^^^^
  assert.equal(
    getNextHitboxes([3, 8], row2),
    [
      [3, 4],
      [6, 7]
    ],
    "hitbox splits"
  );
});

test("edgecase end of hitboxes", () => {
  assert.equal(
    getNextHitboxes([3, 8], "#[]......[]..#"),
    // control                  ^^^^^^
    [],
    "no hitboxes if only hit air"
  );
});

test("edgecase hitting wall", () => {
  assert.equal(
    getNextHitboxes([3, 8], "#[]...#..[]..#"),
    // control                  ^^^^^^
    false,
    "gets stopped by wall piece 1"
  );
  assert.equal(
    getNextHitboxes([3, 8], "#.[]###..[]..#"),
    // control                  ^^^^^^
    false,
    "gets stopped by wall piece 2"
  );
});

test.run();
