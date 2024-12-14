import { test } from "uvu";
import * as assert from "uvu/assert";
import { parseInput } from "./parseInput";

const INPUT = `p=1,2 v=3,4\np=56,19 v=-3,10\np=7,42 v=11,-17`;

test("it parses input", () => {
  assert.equal(parseInput(INPUT), {
    width: 101,
    height: 103,
    robots: [
      { x: 1, y: 2, move: { x: 3, y: 4 } },
      { x: 56, y: 19, move: { x: -3, y: 10 } },
      { x: 7, y: 42, move: { x: 11, y: -17 } }
    ]
  });
});

test("it parses input with size override", () => {
  const modifiedInput = `size=151,163\n${INPUT}`;
  assert.equal(parseInput(modifiedInput), {
    width: 151,
    height: 163,
    robots: [
      { x: 1, y: 2, move: { x: 3, y: 4 } },
      { x: 56, y: 19, move: { x: -3, y: 10 } },
      { x: 7, y: 42, move: { x: 11, y: -17 } }
    ]
  });
});

test.run();
