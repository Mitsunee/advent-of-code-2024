import { log } from "../logger";
import type { Position } from "../shared/coordinates";
import { strWith } from "../shared/strWith";
import type { PuzzleInput, Instruction } from "./parseInput";
import { directions } from "./parseInput";

export function applyInstruction(
  pos: Position,
  instruction: Instruction,
  map: string[]
) {
  switch (instruction) {
    case directions.up:
    case directions.down: {
      const diff = instruction.y;
      let emptyY = -1;
      log.debug(`Movement direction: ${diff == -1 ? "up" : "down"}`);

      // look for empty space above
      for (let y = pos.y + diff; y >= 0; y += diff) {
        const char = map[y][pos.x];
        log.debug(`Checking Y ${y}: ${char}`);
        switch (char) {
          case "#":
            return; // movement not possible
          case ".":
            emptyY = y;
            break; // would put `break 2` here if JS knew how to do that...
        }

        // can we quit early (see above lol)?
        if (emptyY > 0) break;
      }

      log.debug({ diff, emptyY, posY: pos.y, newPosY: pos.y + diff });

      // move robot
      map[pos.y] = strWith(map[pos.y], pos.x, ".");
      pos.y += diff;
      map[pos.y] = strWith(map[pos.y], pos.x, "@");

      // check if only position of robot changes
      if (pos.y == emptyY) break;

      // move replaced box
      map[emptyY] = strWith(map[emptyY], pos.x, "O");
      break;
    }

    case directions.right: {
      log.debug(`Movement direction: right`);
      const match = map[pos.y].match(/@(O*)\./);
      log.debug(match?.[0] || "no match");
      if (!match) break; // movement not possible
      map[pos.y] = map[pos.y].replace(/@O*\./, `.@${match[1]}`);
      pos.x = map[pos.y].indexOf("@");
      break;
    }

    case directions.left: {
      log.debug(`Movement direction: left`);
      const match = map[pos.y].match(/\.(O*)@/);
      log.debug(match?.[0] || "no match");
      if (!match) break;
      map[pos.y] = map[pos.y].replace(/\.O*@/, `${match[1]}@.`);
      pos.x = map[pos.y].indexOf("@");
      break;
    }
  }
}

export function partA(input: PuzzleInput) {
  const { instructions, start: pos, map } = input;
  log.debug(map.join("\n"));

  for (const instruction of instructions) {
    applyInstruction(pos, instruction, map);
    log.debug(map.join("\n"));
  }

  return 0; // TODO
}
