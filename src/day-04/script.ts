import { parseArgs } from "util";
import { readFile } from "fs/promises";
import { log, logger, timer } from "../logger";
import { splitInputByLine } from "../shared/splitInputByLine";
import { partA } from "./partA";
import { partB } from "./partB";

const getTime = timer();
const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    part: { type: "string", short: "p", default: "a" },
    // ❗ UPDATE THIS: ❗                               ↓↓↓↓↓↓↓↓
    input: { type: "string", short: "i", default: "input/day-04.txt" },
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
  const lines = splitInputByLine(input);

  // output result
  const result = (isPartB ? partB : partA)(lines);
  return log.result(result);
}

main()
  .then(() => log.success(`Completed in ${getTime()}`))
  .catch(e => log.fatal(e));
