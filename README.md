# Advent of Code 2024

My solutions for Advent of Code 2024 written in TypeScript

## Installation

Install Node 22.x and pnpm 9.x then run

```shell
pnpm install
```

## Tests

```shell
pnpm typecheck && pnpm test
```

### Running a script or single test

Since the code in this repository is written in TypeScript `tsx` is needed to run scripts:

```shell
pnpm tsx src/day-n/script.ts
```

### Running tests for a specific day

To run all tests in only a specific directory a special `test:dir` script is used:

```shell
pnpm test:dir src/day-n
```

## Prepare script

To create a src directory for starting a solution with the script template simply run `./prepare.sh`.

If used out-of-season the script also takes a day number as parameter like `./prepare.sh 06`. See also `./prepare.sh --help`.

## Stars: 34/50

| Week |  Monday  |  Tuesday  | Wednesday | Thursday  |  Friday   | Saturday  |  Sunday   |
| :--: | :------: | :-------: | :-------: | :-------: | :-------: | :-------: | :-------: |
|  1   |          |           |           |           |           |           | 1st ⭐⭐  |
|  2   | 2nd ⭐⭐ | 3rd ⭐⭐  | 4th ⭐⭐  | 5th ⭐⭐  | 6th ⭐⭐  | 7th ⭐⭐  | 8th ⭐⭐  |
|  3   | 9th ⭐⭐ | 10th ⭐⭐ |  11th ⭐  | 12th ⭐⭐ |  13th ⭐  | 14th ⭐⭐ | 15th ⭐⭐ |
|  4   |   16th   |   17th    | 18th ⭐⭐ | 19th ⭐⭐ | 20th ⭐⭐ |   21st    |   22nd    |
|  5   |   23rd   |   24th    |   25th    |

### Skipped Stars:

<details>
<summary><b>Day 11 Part 2</b></summary>
<p>Could not come up with a solution that doesn't run out of memory in the high 30s. I'm assuming there's some sort of pattern one could take advantage of with the given ruleset, but I'm not the person to figure that out.</p>
<p>I also saw this is really easily solved by adding caching on top of what I already had, but sadly Map in JS only takes a single key, unlike python dicts, which makes implementing caching a lot harder.</p>
</details>

<details>
<summary><b>Day 13 Part 2</b></summary>
<p>That's just maths and it's 23:16 now and I'm too tired for this. Got some hints from reddit: Each machine has at most one solution. Apparently that means binary search is possible, but I could not figure out how to evaluate whether I'm too high or too low.</p>
</details>

<details>
<summary><b>Day 16</b></summary>
<p>I have yet to actually learn a pathfinding algorithm other than bruteforce and both of my attempts at this failed. First I tried to avoid the obvious 'Maximum Callstack size exceed' error by looping over an array instead, which eventually just overfilled memory. Recursion did yield the expected error almost immediatly. Examples do work in both at least.</p>
<p>Update: I tried again with a speed optimization (using Sets and a Queue instead of arrays), but this didn't help the memory issue. I also attempted to save memory by abandoning paths that already got more expensive than the cheapest completed path, but my script was never able to actually finish a path as it kept hitting deadends.</p>
<p>Update 2: I have now actually learned Dijkstra's Shortest Path to solve day 18, so I'll likely reattempt this after I've caught up</p>
</details>

<details>
<summary><b>Day 17</b></summary>
<p>Could not understand instructions, may attempt again later.</p>
</details>

<!---
<details>
<summary><b>Day X Part Y</b></summary>
<p>This is a description of what problem I had solving this puzzle</p>
</details>
-->

## Previous Years I participated

- [2023](https://github.com/mitsunee/advent-of-code-2023)
