/**
 * I decided to do this without regex for fun. Regex likely would've made this
 * puzzle trivial to solve, simply running a matchAll on the puzzle input
 * @param input
 * @returns
 */
export function findMulInstr(input: string) {
  const instructions = new Array<[number, number]>();

  for (let i = 0; i < input.length; i++) {
    let remaining = input.slice(i);

    // seek start of next potential mul instr.
    const nextMul = remaining.indexOf("mul(");
    if (nextMul < 0) break;
    i += 1 + nextMul; // advance loop pointer past current instruction
    remaining = remaining.slice(nextMul);

    // try to find first number
    let a: null | number = null;
    let j = 4;
    for (; j < remaining.length; j++) {
      const char = remaining[j];
      const digit = +char;
      if (char == " " || isNaN(digit)) break;
      a = a === null ? digit : a * 10 + digit;
    }

    if (a === null || a >= 1000) continue; // a needs to be valid three digit number
    if (remaining[j] !== ",") continue; // a needs to be followed by a , (comma)
    j++;

    // try to find second number
    let b: null | number = null;
    for (; j < remaining.length; j++) {
      const char = remaining[j];
      const digit = +char;
      if (char == " " || isNaN(digit)) break;
      b = b === null ? digit : b * 10 + digit;
    }

    if (b === null || b >= 1000) continue; // b needs to be valid three digit number
    if (remaining[j] !== ")") continue; // b needs to be followed by a ) (closing parens)

    instructions.push([a, b]);
  }

  return instructions;
}
