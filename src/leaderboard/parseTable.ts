import { splitInputByLine } from "../shared/splitInputByLine";

interface ParseResultBase {
  day: number;
  part: "a" | "b";
  solved: boolean;
  time?: { hours: number; minutes: number; seconds: number };
  rank?: number;
  score?: number;
}

interface ParseResultUnsolved extends ParseResultBase {
  solved: false;
  time?: undefined;
  rank?: undefined;
  score?: undefined;
}

interface ParseResultSolved extends ParseResultBase {
  solved: true;
  time: NonNullable<ParseResultBase["time"]>;
  rank: NonNullable<ParseResultBase["rank"]>;
  score: NonNullable<ParseResultBase["score"]>;
}

type ParseResult = ParseResultSolved | ParseResultUnsolved;

function parseMatch(match: RegExpExecArray, part: "a" | "b") {
  const day = parseInt(match.input.trimStart());
  let result: ParseResult;

  if (match[0] == "- - -") {
    result = { day, part, solved: false };
  } else {
    const [hourStr, minStr, secStr] = match[1].split(":");

    result = {
      day,
      part,
      solved: true,
      time: {
        hours: Number(hourStr),
        minutes: Number(minStr),
        seconds: Number(secStr)
      },
      rank: Number(match[2]),
      score: Number(match[3])
    };
  }

  return result;
}

function parseTableLine(line: string) {
  const normalized = line.replace(/ {2,}/g, " ");
  const match = normalized
    .matchAll(/(-|\d{2}:\d{2}:\d{2}) (-|\d+) (-|\d{1,3})/g)
    .toArray();
  if (match.length != 2) {
    throw new Error(`Could not parse line:\n${line}`);
  }

  return { partA: parseMatch(match[0], "a"), partB: parseMatch(match[1], "b") };
}

export function parseTable(input: string) {
  const lines = splitInputByLine(input).slice(2);
  return lines.map(line => parseTableLine(line));
}
