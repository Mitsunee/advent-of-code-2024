import { test } from "uvu";
import * as assert from "uvu/assert";
import { strWith } from "./strWith";

test("inserts character in middle of string", () => {
  assert.is(strWith("foobar", 1, "x"), "fxobar");
  assert.is(strWith("foobar", 2, "x"), "foxbar");
});

test("inserts character at start of string", () => {
  assert.is(strWith("foobar", 0, "x"), "xoobar");
});

test("inserts character at end of string", () => {
  assert.is(strWith("foobar", 5, "x"), "foobax");
  assert.is(strWith("foobar", 6, "x"), "foobarx");
});

test.run();
