import { log } from "../logger";
import type { Position } from "../shared/coordinates";
import type { Hitbox } from "./hitboxes/types";
import { visualizeHitboxes } from "./hitboxes/visualizeHitboxes";
import { mapHitbox } from "./hitboxes/mapHitbox";
import type { Instruction, PuzzleInput } from "./parseInput";
import { directions } from "./parseInput";
import { getGPSScore } from "./getGPSScore";

const mapMod = { "#": "##", O: "[]", ".": "..", "@": "@." } as Partial<
  Record<string, string>
>;

function modifyMapLine(line: string) {
  let newLine = "";

  for (let i = 0; i < line.length; i++) {
    const newChar = mapMod[line[i]];
    if (!newChar) {
      throw new Error(
        `Unrecognized character in map '${line[i]}' in line ${i}`
      );
    }

    newLine += newChar;
  }

  return newLine;
}

function modifyMap(map: string[]) {
  const newMap = map.map(modifyMapLine);
  const newStart: Position = { x: -1, y: -1 };

  for (let y = 1; y < newMap.length; y++) {
    for (let x = 1; x < newMap[y].length; x++) {
      if (newMap[y][x] == "@") {
        Object.assign(newStart, { x, y });
        return { map: newMap, pos: newStart };
      }
    }
  }

  throw new Error("Could not find new start position");
}

function applyInstruction(
  pos: Position,
  instruction: Instruction,
  map: string[]
) {
  switch (instruction) {
    case directions.up:
    case directions.down: {
      const diff = instruction.y;
      log.debug(`Movement direction: ${diff == -1 ? "up" : "down"}`);

      const { emptyY, hitboxMap } = mapHitbox(pos, diff, map);
      visualizeHitboxes(hitboxMap, map);
      if (emptyY < 0) return; // movement wasn't possible

      // apply movement
      for (let y = emptyY; y > 0 && y < map.length; y -= diff) {
        // special case for y == pos.y where it just removes the @
        if (y == pos.y) {
          map[y] = map[y].replace("@", ".");
          break;
        }

        const curr = { str: map[y], hitboxes: hitboxMap[y] };
        const prev = { str: map[y - diff], hitboxes: hitboxMap[y - diff] };
        let newRow = "";

        // compare rows
        for (let i = 0; i < curr.str.length; i++) {
          const hasHB = ([start, stop]: Hitbox) => start <= i && stop >= i;
          const currHasHB = curr.hitboxes.some(hasHB);
          const prevHasHB = prev.hitboxes.some(hasHB);
          newRow += prevHasHB ? prev.str[i] : currHasHB ? "." : curr.str[i];
        }

        map[y] = newRow;
      }

      pos.y += diff;

      break;
    }

    case directions.right: {
      log.debug(`Movement direction: right`);
      const match = map[pos.y].match(/@((?:\[\])*)\./);
      log.debug(match?.[0] || "no match");
      if (!match) break; // movement not possible
      map[pos.y] = map[pos.y].replace(/@(\[\])*\./, `.@${match[1]}`);
      pos.x = map[pos.y].indexOf("@");
      break;
    }

    case directions.left: {
      log.debug(`Movement direction: left`);
      const match = map[pos.y].match(/\.((?:\[\])*)@/);
      log.debug(match?.[0] || "no match");
      if (!match) break;
      map[pos.y] = map[pos.y].replace(/\.(\[\])*@/, `${match[1]}@.`);
      pos.x = map[pos.y].indexOf("@");
      break;
    }
  }
}

export function partB(input: PuzzleInput) {
  const { map, pos } = modifyMap(input.map);
  log.debug(map.join("\n"));

  for (const instruction of input.instructions) {
    applyInstruction(pos, instruction, map);
    log.debug(map.join("\n"));
  }

  return getGPSScore(map, "[");
}
