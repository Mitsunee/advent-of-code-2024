import { test } from "uvu";
import * as assert from "uvu/assert";
import { concat } from "./solve";

test("it concats numbers", () => {
  assert.is(concat(19, 3), 193);
  assert.is(concat(834, 834), 834834);
});

test.run();
