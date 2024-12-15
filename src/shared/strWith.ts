export function strWith(str: string, idx: number, value: string) {
  if (idx > str.length) {
    throw new Error("Cannot insert character beyond string length");
  }

  return str.slice(0, idx) + value[0] + str.slice(idx + 1);
}
