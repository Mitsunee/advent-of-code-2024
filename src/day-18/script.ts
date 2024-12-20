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
    input: { type: "string", short: "i", default: "input/day-18-input.txt" },
    verbose: { type: "boolean", short: "v", default: false },
    lines: { type: "string", short: "l", default: "-1" }
  }
});

async function main() {
  // DEBUG
  if (args.verbose) logger.setLogLevel("Debug");
  log.debug(args);

  // process input
  let maxLines = -1;
  if (args.lines) {
    const val = Number(args.lines);
    if (isNaN(val)) {
      throw new Error(`--max-lines value must be number!`);
    }
    maxLines = val;
  }
  const isPartB = args.part.toLowerCase() == "b";
  const input = await readFile(args.input, "utf8");
  const parsed = parseInput(input);

  // output result
  // USE DURING DEV ↓↓↓↓↓
  const result = (isPartB ? partB : partA)(parsed, maxLines);
  return log.result(result);
}

main()
  .then(() => log.success(`Completed in ${getTime()}`))
  .catch(e => log.fatal(e));
