import type { PuzzleDisk } from "./parseDisk";

/**
 * Reformats PuzzleDisk Array to array of blocks
 * @param disk
 * @returns Array of blocks with either file id or null
 */
export function diskToBlocks(disk: PuzzleDisk) {
  // sort disk into array of blocks in order
  return disk.flatMap(blocks =>
    blocks.id !== undefined
      ? Array<number>(blocks.size).fill(blocks.id)
      : Array<null>(blocks.size).fill(null)
  );
}
