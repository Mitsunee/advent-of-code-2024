export function* createPRNG(seed: number) {
  let num = seed;
  let temp = 0;

  while (true) {
    // step 1
    temp = num * 64;
    num ^= temp;
    num >>>= 0; // found this in a solution on reddit, dunno why this is needed
    num %= 16777216;

    // step 2
    temp = Math.floor(num / 32);
    num ^= temp;
    num >>>= 0;
    num %= 16777216;

    // step 3
    temp = num * 2048;
    num ^= temp;
    num >>>= 0;
    num %= 16777216;

    yield num;
  }
}
