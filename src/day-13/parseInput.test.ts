import { test } from "uvu";
import * as assert from "uvu/assert";
import { parseInput } from "./parseInput";

// prettier-ignore
const INPUT =
`Button A: X+34, Y+23
Button B: X+7, Y+37
Prize: X=871, Y=686

Button A: X+23, Y+34
Button B: X+37, Y+7
Prize: X=686, Y=871
`;

test("it parses as expected", () => {
  assert.equal(parseInput(INPUT), [
    { a: { x: 34, y: 23 }, b: { x: 7, y: 37 }, prizePos: { x: 871, y: 686 } },
    { a: { y: 34, x: 23 }, b: { y: 7, x: 37 }, prizePos: { y: 871, x: 686 } }
  ]);
});

test.run();
