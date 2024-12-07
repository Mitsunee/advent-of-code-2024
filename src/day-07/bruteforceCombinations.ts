export type MathOpFn = (a: number, b: number) => number;

export function bruteforceCombinations(nums: number[], operations: MathOpFn[]) {
  if (nums.length < 1) return [];
  if (nums.length < 2) return [nums[0]];

  let results = new Array<number>();
  results.push(nums[0]);

  for (let i = 1; i < nums.length; i++) {
    const right = nums[i];
    const newResults = results.flatMap(left =>
      operations.map(op => op(left, right))
    );
    results = newResults;
  }

  return results;
}
