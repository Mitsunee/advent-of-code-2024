import { test } from "uvu";
import * as assert from "uvu/assert";
import { filterDisabledInstr } from "./filterDisabledInstr";

const testInput =
  ")~>>when(); *'@mul(724,407)don't()-when()why(533,992),')(:mul(472,652)?mul(350,214)";

test("it stops at don't instruction", () => {
  assert.is(filterDisabledInstr(testInput), ")~>>when(); *'@mul(724,407)");
});

test("it continues again after do() instruction", () => {
  const newPart = ";do()??)(:)mul(305,1)%";
  const newInput = testInput + newPart;
  assert.is(
    filterDisabledInstr(newInput),
    ")~>>when(); *'@mul(724,407)".concat(newPart.slice(2))
  );
});

test.run();
