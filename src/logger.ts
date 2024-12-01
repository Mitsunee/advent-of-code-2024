import { createLogger } from "@foxkit/logger";
import { createColors } from "picocolors";
import spacetime from "spacetime";

const col = createColors(true);

export function timer() {
  const start = spacetime.now();
  return () => {
    const end = spacetime.now();
    return end.since(start).abbreviated.join(" ") || "under 1s";
  };
}

const { log, logger } = createLogger({
  levels: [
    { name: "Debug", color: col.gray },
    { name: "Success", color: col.cyan },
    { name: "Result", color: col.magenta },
    { name: "Warn", color: col.yellow, type: "warn" },
    { name: "Error", color: col.red, type: "error" },
    { name: "FATAL", color: col.bgRed, type: "error", colorMode: "full" }
  ],
  defaultLevel: "Success",
  template: "[%hour%:%#min%] [%#Name#%]",
  inspectOpts: { colors: true, depth: 4 }
});

export { log, logger };
