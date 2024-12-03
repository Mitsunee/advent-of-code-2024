export function filterDisabledInstr(input: string) {
  let on = true;
  let filteredInput = "";

  for (let i = 0; i < input.length; i++) {
    const remaining = input.slice(i);
    const seek = on ? "don't()" : "do()";
    const next = remaining.indexOf(seek);

    // reached end of do/don't instructions
    if (next < 0) {
      if (on) filteredInput += remaining;
      break;
    }
    i += next; // also advance loop pointer

    // append piece of enabled instructions
    if (on) {
      filteredInput += remaining.slice(0, next);
    }

    on = !on;
  }

  return filteredInput;
}
