import type { PuzzleDisk, PuzzleFile } from "./parseDisk";
import { logDisk } from "./logDisk";

function findEmptyBlock(
  block: PuzzleDisk[number],
  idx: number,
  disk: PuzzleDisk
) {
  if (idx + 1 >= disk.length || typeof block.id == "number") return false;
  const nextBlock = disk[idx + 1];
  if (typeof nextBlock.id == "number") return false;
  return true;
}

/**
 * Merges sequential empty blocks in disk
 * @param disk
 */
function mergeEmptyBlocks(disk: PuzzleDisk) {
  let idx: number;

  while ((idx = disk.findIndex(findEmptyBlock)) >= 0) {
    const block = disk[idx];
    const nextBlock = disk[idx + 1];
    const totalSize = block.size + nextBlock.size;
    disk.splice(idx, 2, { size: totalSize });
  }

  return disk;
}

/**
 * Single-pass defrag. This ran in 34 seconds for me.
 * Possible optimization might be using @foxkit/list for faster splices, since
 * this is re-indexing arrays a LOT
 * @param disk
 */
export function defragDisk(disk: PuzzleDisk) {
  const lastFile = disk.findLast(block => typeof block.id == "number");
  if (!lastFile) return disk; // TypeScript is now happy and will leave me alone

  // DEBUG
  logDisk(disk);

  for (let id = lastFile.id; id >= 0; id--) {
    const currentIdx = disk.findIndex(block => block.id == id);
    const movedBlock = disk[currentIdx] as PuzzleFile;
    const newIdx = disk.findIndex(
      block => typeof block.id === "undefined" && block.size >= movedBlock.size
    );

    if (newIdx < 0 || newIdx > currentIdx) continue; // doesn't move file left, byebye

    // perform splices
    disk.splice(currentIdx, 1, { size: movedBlock.size }); // removes moved block from old position
    const insertedBlocks: PuzzleDisk = [movedBlock];
    const remainingSize = disk[newIdx].size - movedBlock.size;
    // if the empty block was larger reinsert new empty block with remaining size
    if (remainingSize > 0) insertedBlocks.push({ size: remainingSize });
    disk.splice(newIdx, 1, ...insertedBlocks);

    // cleanup
    mergeEmptyBlocks(disk);
    logDisk(disk);
  }

  return disk;
}
