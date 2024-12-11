import { List } from "@foxkit/list";
import { log } from "../logger";

function processNumber(num: string) {
  const digits = num.length;

  if (num === "0") return ["1"];
  if (digits % 2 == 0) {
    return [num.slice(0, digits / 2), num.slice(digits / 2)].map(
      num => num.replace(/^0+/, "") || "0"
    );
  }

  return [(Number(num) * 2024).toString()];
}

function iterList(list: List<string>) {
  const newList = new List<string>();

  list.forEach(num => {
    const results = processNumber(num);
    for (const res of results) {
      newList.push(res);
    }
  });

  return newList;
}

export function solve(input: string, isPartB: boolean) {
  let list = new List(input.replace(/^[ \n]+|[ \n]+$/, "").split(" "));
  const len = isPartB ? 75 : 25;

  for (let i = 0; i < len; i++) {
    list = iterList(list);
    log.debug(`After iteration ${i} list is ${list.length} long`);
    if (i < 10) log.debug(list.join(" "));
  }

  return list.length;
}
