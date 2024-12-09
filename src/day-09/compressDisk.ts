import { diskToBlocks } from "./diskToBlocks";
import type { PuzzleDisk } from "./parseDisk";

export function compressDisk(disk: PuzzleDisk) {
  // sort disk into array of blocks in order
  const blocks = diskToBlocks(disk);

  // sort blocks so all empty blocks are on the right
  let filePointer = blocks.findLastIndex(val => val !== null);
  let i = blocks.findIndex(val => val === null);
  function updatePointers() {
    while (blocks[i] !== null) i++;
    while (blocks[filePointer] === null) filePointer--;
  }

  while (i < filePointer) {
    blocks[i] = blocks[filePointer];
    blocks[filePointer] = null;
    updatePointers();
  }

  // create new puzzle disk from sorted blocks
  const newDisk: PuzzleDisk = [];

  for (let i = 0; i < blocks.length; i++) {
    const id = blocks[i];
    const start = i;
    while (blocks[i + 1] === id) i++; // seek end of block
    const size = i - start + 1;
    newDisk.push(id === null ? { size } : { id, size });
  }

  return { blocks, newDisk };
}
