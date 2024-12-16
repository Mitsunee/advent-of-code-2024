import { parseArgs } from "util";
import { readFile } from "fs/promises";
import { log, logger, timer } from "../logger";
import { parseInput } from "./parseInput";
import { partA } from "./partA";
//import { partB } from "./partB";
//import { solve } from "./solve";

const getTime = timer();
const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    part: { type: "string", short: "p", default: "a" },
    input: { type: "string", short: "i", default: "input/day-16-input.txt" },
    verbose: { type: "boolean", short: "v", default: false }
  }
});

async function main() {
  // DEBUG
  if (args.verbose) logger.setLogLevel("Debug");
  log.debug(args);

  // process input
  const isPartB = args.part.toLowerCase() == "b";
  const input = await readFile(args.input, "utf8");
  const parsed = parseInput(input);

  // output result
  // USE DURING DEV ↓↓↓↓↓
  let result: number;
  if (isPartB) {
    throw new Error("Part B unimplemented");
    //result = partB(input);
  } else {
    result = partA(parsed);
  }

  // USE WHEN FINISHED ↓↓↓↓
  //const result = (isPartB ? partB : partA)(input);
  // or
  //const result = solve(input, isPartB);
  return log.result(result);
}

main()
  .then(() => log.success(`Completed in ${getTime()}`))
  .catch(e => log.fatal(e));
