import { parseArgs } from "util";
import { readFile } from "fs/promises";
import { log, logger, timer } from "../logger";
import { solve } from "./solve";

const getTime = timer();
const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    part: { type: "string", short: "p", default: "a" },
    input: { type: "string", short: "i", default: "input/day-11.txt" },
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

  // oops
  if (isPartB) {
    throw new Error(`Part B solution runs out of JS Heap memory`);
  }

  const result = solve(input, false);
  return log.result(result);
}

main()
  .then(() => log.success(`Completed in ${getTime()}`))
  .catch(e => log.fatal(e));
