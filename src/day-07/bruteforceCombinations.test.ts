import { test } from "uvu";
import * as assert from "uvu/assert";
import type { MathOpFn } from "./bruteforceCombinations";
import { bruteforceCombinations } from "./bruteforceCombinations";

const sort = (a: number, b: number) => a - b;
const ops: MathOpFn[] = [(a, b) => a + b, (a, b) => a * b];

test("it gets all possible results of additions and multiplications", () => {
  assert.equal(
    bruteforceCombinations([10, 19], ops).sort(sort),
    [10 + 19, 10 * 19].sort(sort)
  );
  assert.equal(
    bruteforceCombinations([81, 40, 27], ops).sort(sort),
    [81 + 40 + 27, 81 * 40 + 27, (81 + 40) * 27, 81 * 40 * 27].sort(sort)
  );
});

test.run();
