import { parseArgs } from "util";
import { readFile } from "fs/promises";
import { log, logger, timer } from "../logger";
import { parseInput } from "./parseInput";
import { partA } from "./partA";
import { partB } from "./partB";

const getTime = timer();
const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    part: { type: "string", short: "p", default: "a" },
    input: { type: "string", short: "i", default: "input/day-14.txt" },
    verbose: { type: "boolean", short: "v", default: false },
    threshold: { type: "string", short: "t", default: "0.415" }
  }
});

async function main() {
  // DEBUG
  if (args.verbose) logger.setLogLevel("Debug");
  log.debug(args);

  // process input
  const isPartB = args.part.toLowerCase() == "b";
  let threshold = Number(args.threshold);
  if (isNaN(threshold)) {
    log.warn(`Ignored invalid threshold argument: '${args.threshold}'`);
    threshold = 0.415;
  }
  const input = await readFile(args.input, "utf8");
  const parsed = parseInput(input);

  // output result
  const result = isPartB ? partB(parsed, threshold) : partA(parsed);
  return log.result(result);
}

main()
  .then(() => log.success(`Completed in ${getTime()}`))
  .catch(e => log.fatal(e));
