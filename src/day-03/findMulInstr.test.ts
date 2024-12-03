import { test } from "uvu";
import * as assert from "uvu/assert";
import { findMulInstr } from "./findMulInstr";

const testInput =
  "()how()#don't()select();;?how()[<mul(682,60)%+mul(166,261)!#<~who()'@who()/" +
  "mul(991;mul(602, 939)why()*how()mul(815 ~>who()who()how()where(184,532)#from" +
  "() [mul(771,388)how()'~!^!@+mul(646,938)+,(({-mul(486,708)^%^from()-(;what" +
  "()]mul(144,833)~why()%select()&<~how())mul(4319,873)mul(677[[;{:?{>[ " +
  "(mul(0,577))@:mul(727,412)why();?select()?what()};from()*mul(826,116)";

test("it finds mul instructions in a string", () => {
  assert.equal(findMulInstr(testInput), [
    [682, 60],
    [166, 261],
    [771, 388],
    [646, 938],
    [486, 708],
    [144, 833],
    [0, 577],
    [727, 412],
    [826, 116]
  ]);
});

test("it finds mul instruction at start of a string", () => {
  const input = "mul(646,938)+,(({-mul(486,708)^%^from()";
  assert.equal(findMulInstr(input), [
    [646, 938],
    [486, 708]
  ]);
});

test("it correctly handles cut of instruction at end", () => {
  assert.equal(findMulInstr("@mul(1,23);$mul("), [[1, 23]]);
  assert.equal(findMulInstr("@mul(1,23);$mul(2"), [[1, 23]]);
  assert.equal(findMulInstr("@mul(1,23);$mul(2,"), [[1, 23]]);
  assert.equal(findMulInstr("@mul(1,23);$mul(2,23"), [[1, 23]]);
});

test.run();
