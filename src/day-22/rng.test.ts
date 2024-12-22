import { test } from "uvu";
import * as assert from "uvu/assert";
import { createPRNG } from "./prng";

test("it gets example results", () => {
  const gen = createPRNG(123);
  const expected = [
    15887950, 16495136, 527345, 704524, 1553684, 12683156, 11100544, 12249484,
    7753432, 5908254
  ];

  for (let i = 0; i < expected.length; i++) {
    assert.is(gen.next().value, expected[i], `iteration ${i}`);
  }
});

test.run();
