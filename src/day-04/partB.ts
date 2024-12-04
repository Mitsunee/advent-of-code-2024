import { log } from "../logger";

export function partB(input: string[]) {
  let count = 0;

  for (let y = 1; y < input.length - 1; y++) {
    log.debug(`Processing row ${y}`);
    let rowCount = 0;

    for (let x = 1; x < input[y].length - 1; x++) {
      if (input[y][x] != "A") continue;
      log.debug(`Found A at [${x},${y}]`);

      const upLeft = input[y - 1][x - 1];
      const downLeft = input[y + 1][x - 1];
      if (
        (upLeft != "M" && upLeft != "S") ||
        (downLeft != "M" && downLeft != "S")
      ) {
        continue;
      }
      const upRight = input[y - 1][x + 1];
      const downRight = input[y + 1][x + 1];
      if (
        upRight == (downLeft == "M" ? "S" : "M") &&
        downRight == (upLeft == "M" ? "S" : "M")
      ) {
        log.debug(`Found cross at [${x},${y}]`);
        rowCount++;
      }
    }

    log.debug(`Found X-MAS ${rowCount} times in this row`);
    count += rowCount;
  }

  return count;
}
