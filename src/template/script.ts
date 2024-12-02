import { parseArgs } from "util";
import { readFile } from "fs/promises";
import { log, logger, timer } from "../logger";
//import { partA } from "./partA";
//import { partB } from "./partB";

const getTime = timer();
const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    part: { type: "string", short: "p", default: "a" },
    // ❗ UPDATE THIS: ❗                               ↓↓↓↓↓↓↓↓
    input: { type: "string", short: "i", default: "input/day-XX.txt" },
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

  // output result
  let result: unknown;
  if (isPartB) {
    throw new Error("Part B unimplemented");
  } else {
    throw new Error("Part A unimplemented");
  }

  return log.result(result);
}

main()
  .then(() => log.success(`Completed in ${getTime()}`))
  .catch(e => log.fatal(e));