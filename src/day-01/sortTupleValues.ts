import { splitTuples } from "./splitTuples";

type SortFn<T> = Parameters<Array<T>["sort"]>[0];

export function sortTupleValues(
  list: [number, number][],
  sortLeft: SortFn<number>,
  sortRight: SortFn<number>
) {
  const [left, right] = splitTuples(list);

  left.sort(sortLeft);
  right.sort(sortRight);

  const newList = new Array<[number, number]>();

  for (let i = 0; i < left.length; i++) {
    newList.push([left[i], right[i]]);
  }

  return newList;
}
