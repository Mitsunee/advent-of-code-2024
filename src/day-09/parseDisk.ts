export interface PuzzleFile {
  id: number;
  size: number;
}

export interface PuzzleFreeSpace {
  id?: undefined;
  size: number;
}

export type PuzzleDisk = ReturnType<typeof parseDisk>;

export function parseDisk(input: string) {
  const inputNums = Array.from(input.replace(/[^0-9]/g, ""), n => Number(n));
  const disk = new Array<PuzzleFile | PuzzleFreeSpace>();
  let fileIdCounter = 0;

  for (let i = 0; i < inputNums.length; i += 2) {
    disk.push({ id: fileIdCounter++, size: inputNums[i] });
    if (i + 1 < inputNums.length) {
      disk.push({ size: inputNums[i + 1] });
    }
  }

  return disk;
}
