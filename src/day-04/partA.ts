import { log } from "../logger";

export function partA(input: string[]) {
  let count = 0;
  const max = {
    height: input.length - 1,
    width: input[0].length - 1
  } as const;

  for (let y = 0; y < input.length; y++) {
    log.debug(`Processing row ${y}`);
    let rowCount = 0;

    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] != "X") continue;
      log.debug(`Found X at [${x},${y}]`);

      for (let yDir = -1; yDir <= 1; yDir++) {
        for (let xDir = -1; xDir <= 1; xDir++) {
          if (yDir == 0 && xDir == 0) continue; // skip 0,0 case because that'd always be "XXXX" anyways lol
          log.debug(
            `Checking ${yDir == 1 ? "down" : yDir ? "up" : ""}${yDir && xDir ? " " : ""}${xDir == 1 ? "right" : xDir ? "left" : ""} from [${x},${y}]`
          );
          let str = "";
          for (let i = 0; i <= 3; i++) {
            const coords = { y: y + i * yDir, x: x + i * xDir };
            // prettier-ignore
            if (
              coords.x < 0 || coords.x > max.width ||
              coords.y < 0 || coords.y > max.height
            ) break;
            const char = input[coords.y][coords.x];
            str += char;
          }
          if (str == "XMAS") rowCount++;
        }
      }
    }

    log.debug(`Found XMAS ${rowCount} times in this row`);
    count += rowCount;
  }

  return count;
}
