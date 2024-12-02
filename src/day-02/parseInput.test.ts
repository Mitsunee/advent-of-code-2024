import { test } from "uvu";
import { equal } from "uvu/assert";
import { parseInput } from "./parseInput";

test("Parses input lines", () => {
  equal(
    parseInput(`1 2 3 4 5\n6 7 8 9`),
    [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9]
    ],
    "input with two lines, single digits"
  );
  equal(
    parseInput(`12 23 34 45\n56 67 78 89`),
    [
      [12, 23, 34, 45],
      [56, 67, 78, 89]
    ],
    "input with two lines, two digits"
  );
  equal(
    parseInput(`1 2 34 4\n56 67 78 9`),
    [
      [1, 2, 34, 4],
      [56, 67, 78, 9]
    ],
    "input with two lines, mixed digits"
  );
});

test.run();
