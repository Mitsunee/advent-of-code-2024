import { filterDisabledInstr } from "./filterDisabledInstr";
import { partA } from "./partA";

export function partB(input: string) {
  const filtered = filterDisabledInstr(input);
  return partA(filtered);
}
