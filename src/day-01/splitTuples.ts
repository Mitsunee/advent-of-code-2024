export function splitTuples(list: [number, number][]) {
  const left = new Array<number>();
  const right = new Array<number>();

  for (const [valL, valR] of list) {
    left.push(valL);
    right.push(valR);
  }

  return [left, right];
}
