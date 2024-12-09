import { log } from "../logger";
import { diskToBlocks } from "./diskToBlocks";
import type { PuzzleDisk } from "./parseDisk";

export function logDisk(disk: PuzzleDisk) {
  const blocks = diskToBlocks(disk);
  const lastVal = disk.findLast(block => typeof block.id == "number");
  if (lastVal && lastVal.id > 9) {
    // TODO: padding?
    log.debug(blocks.map(v => (v === null ? "[.]" : `[${v}]`)).join(""));
    return;
  }

  log.debug(blocks.map(v => (v === null ? "." : v)).join(""));
}
