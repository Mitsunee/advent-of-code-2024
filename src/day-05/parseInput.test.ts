import { test } from "uvu";
import * as assert from "uvu/assert";
import type { PuzzleInput } from "./parseInput";
import { parseInput } from "./parseInput";

test("it parses input as expected", () => {
  const input = `1|2\n1|3\n2|3\n\n1,2,3\n2,3,1`;
  const expected: PuzzleInput = {
    rules: [
      [1, 2],
      [1, 3],
      [2, 3]
    ],
    updates: [
      [1, 2, 3],
      [2, 3, 1]
    ]
  };
  assert.equal(parseInput(input), expected);
  assert.equal(
    parseInput(input.concat("\n")),
    expected,
    "handles trailing newline"
  );
});

test.run();
