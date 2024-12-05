import { test } from "uvu";
import * as assert from "uvu/assert";
import { createSorter } from "./createSorter";

// prettier-ignore
const sortUpdate = createSorter([[4,1], [4,2], [4,3], [3,2], [3,1], [2,1]]);

test("it sorts as expected", () => {
  const input = [3, 4, 1, 2];
  const expected = [4, 3, 2, 1];
  assert.equal(sortUpdate(input), expected);
});

test.run();
