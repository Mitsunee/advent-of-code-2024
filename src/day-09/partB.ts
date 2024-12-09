import { defragDisk } from "./defragDisk";
import { diskToBlocks } from "./diskToBlocks";
import { getChecksumFromBlocks } from "./getChecksumFromBlocks";
import type { PuzzleDisk } from "./parseDisk";

export function partB(disk: PuzzleDisk) {
  defragDisk(disk);
  const blocks = diskToBlocks(disk);
  return getChecksumFromBlocks(blocks);
}
