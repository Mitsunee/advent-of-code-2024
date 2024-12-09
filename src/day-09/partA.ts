import { compressDisk } from "./compressDisk";
import { getChecksumFromBlocks } from "./getChecksumFromBlocks";
import type { PuzzleDisk } from "./parseDisk";

export function partA(disk: PuzzleDisk) {
  const { blocks: sortedBlocks } = compressDisk(disk);
  return getChecksumFromBlocks(sortedBlocks);
}
