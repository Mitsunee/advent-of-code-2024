import { log } from "../logger";
import type { PuzzleInput } from "./parseInput";

export function createSorter(rules: PuzzleInput["rules"]) {
  function findRule(a: number, b: number) {
    return rules.find(
      rule => (rule[0] == a && rule[1] == b) || (rule[1] == a && rule[0] == b)
    );
  }

  function sortByRule(a: number, b: number) {
    const rule = findRule(a, b);
    if (!rule) {
      log.warn(`Could not find sorting rule for pair: ${a}|${b}`);
      return 0;
    }

    return a == rule[0] ? -1 : 1;
  }

  return (update: PuzzleInput["updates"][0]) => update.toSorted(sortByRule);
}
