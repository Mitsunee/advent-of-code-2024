import { test } from "uvu";
import * as assert from "uvu/assert";
import { parseInput, directions } from "./parseInput";

const map = ["#####", "#O..#", "#OO.#", "#.@.#", "#..O#", "#####"];
const instructions = [
  directions.up,
  directions.up,
  directions.down,
  directions.down,
  directions.left,
  directions.right,
  directions.left,
  directions.right
];
const INPUT = `${map.join("\n")}\n\n^^vv\n<><>\n`;

test("parses input", () => {
  assert.equal(parseInput(INPUT), { map, instructions, start: { x: 2, y: 3 } });
});

test.run();
