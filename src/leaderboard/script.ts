import { parseArgs } from "util";
import { readFile } from "fs/promises";
import { log, logger, timer } from "../logger";
import { parseTable } from "./parseTable";

const getTime = timer();
const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    input: { type: "string", short: "i", default: "input/leaderboard.txt" },
    verbose: { type: "boolean", short: "v", default: false },
    generate: { type: "boolean", short: "g", default: false }
  }
});

async function main() {
  // DEBUG
  if (args.verbose) logger.setLogLevel("Debug");
  log.debug(args);

  const input = await readFile(args.input, "utf8");
  const data = parseTable(input);
  log.debug(data);

  if (args.generate) {
    log.error("generate option unimplemented");
  }

  throw new Error("rest of script unimplemented");
}

main()
  .then(() => log.success(`Completed in ${getTime()}`))
  .catch(e => log.fatal(e));
