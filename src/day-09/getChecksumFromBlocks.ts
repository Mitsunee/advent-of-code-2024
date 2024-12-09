export function getChecksumFromBlocks(blocks: (number | null)[]) {
  return blocks.reduce((sum: number, block, idx): number => {
    if (block === null) return sum;
    return sum + block * idx;
  }, 0);
}
