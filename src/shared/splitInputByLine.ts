/**
 * Splits input into Array of lines, correctly handling trailing empty line(s)
 * @param input Input data
 * @returns Input lines
 */
export function splitInputByLine(input: string) {
  return input.replace(/\n+$/, "").split("\n");
}
