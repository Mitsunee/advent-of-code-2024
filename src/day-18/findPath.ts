import { List } from "@foxkit/list";
import type { Direction, Directions, Position } from "../shared/coordinates";
import {
  directionMovement,
  directionOpposite,
  positionToString
} from "../shared/coordinates";
import { log } from "../logger";

/*
This is my first time ever actually implementing dijkstra for pathfinding, since
this is finally an easy example (no weird cost rules like day 16) to try it on
and I actually had the motivation to bother
*/

function getDirections(pos: Position, map: string[]) {
  const directions = new Array<Directions>();

  // up
  if (pos.y > 0 && map[pos.y - 1][pos.x] != "#") directions.push("up");

  // right
  if (pos.x < map[0].length - 1 && map[pos.y][pos.x + 1] != "#") {
    directions.push("right");
  }

  // down
  if (pos.y < map.length - 1 && map[pos.y + 1][pos.x] != "#") {
    directions.push("down");
  }

  // left
  if (pos.x > 0 && map[pos.y][pos.x - 1] != "#") directions.push("left");

  return directions;
}

interface Connection {
  cost: number;
  to: Intersection;
}

interface Route {
  totalCost: number;
  via: Intersection;
}

interface Intersection {
  up?: Connection | null;
  right?: Connection | null;
  down?: Connection | null;
  left?: Connection | null;
  pos: Position;
  cheapestVia?: Route;
  done?: true; // whether all directions have been checked
}

function createIntersection(pos: Position, map: string[]) {
  if (map[pos.y][pos.x] == "#") return; // wall cannot be intersection

  const directions = getDirections(pos, map);
  if (directions.length <= 2) return;

  const intersection: Intersection = { pos };
  if (!directions.includes("up")) intersection.up = null;
  if (!directions.includes("right")) intersection.right = null;
  if (!directions.includes("down")) intersection.down = null;
  if (!directions.includes("left")) intersection.left = null;

  return intersection;
}

function findIntersections(map: string[]) {
  const intersections = new Array<Intersection>();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const intersection = createIntersection({ x, y }, map);
      if (!intersection) continue;
      intersections.push(intersection);
    }
  }

  return new Map(
    intersections.map(intersection => [
      positionToString(intersection.pos),
      intersection
    ])
  );
}

function createPathFinder(
  map: string[],
  intersections: ReturnType<typeof findIntersections>
) {
  return function pathFind(node: Intersection, dir: Directions) {
    if (typeof node[dir] == "object") return node[dir];

    const diff = directionMovement[dir];
    const pos: Direction = {
      x: node.pos.x + diff.x,
      y: node.pos.y + diff.y,
      direction: dir
    };
    let cost = 1;

    while (!intersections.has(positionToString(pos))) {
      cost++;

      // assume there is either 1 or 2 directions from here because otherwise
      // there should be an intersection and I'm tired of confirming everything
      // thrice already. I will likely regret this later :)
      const directions = getDirections(pos, map).filter(
        dir => dir != directionOpposite[pos.direction]
      );

      const newDirection = directions.pop();

      // if we hit a dead end there is only the direction we came from, which
      // got filtered out above, so this is undefined
      if (!newDirection) {
        node[dir] = null;
        return null;
      }

      pos.direction = newDirection;
      const diff = directionMovement[pos.direction];
      pos.x += diff.x;
      pos.y += diff.y;
    }

    const connectsTo = intersections.get(positionToString(pos))!;
    const connection: Connection = { to: connectsTo, cost };
    node[dir] = connection;
    connection.to[directionOpposite[pos.direction]] = { to: node, cost };
    return connection;
  };
}

function rankNode(node: Intersection, dir: Directions, cost: number) {
  if (!node[dir] || node[dir].to.done) return;
  const totalCost = cost + node[dir]?.cost;
  if (
    !node[dir].to.cheapestVia ||
    node[dir].to.cheapestVia.totalCost > totalCost
  ) {
    node[dir].to.cheapestVia = { via: node, totalCost };
  }
  return node[dir].to;
}

export function findPath(
  map: string[],
  startPos: Position,
  endPos: Position,
  useLog = true
) {
  const intersections = findIntersections(map); // map of coordinate => Intersection
  const connected = new Set<Intersection>(); // set to track filling out graph
  const queue = new List<Intersection>(); // queue for loops
  let node: undefined | Intersection = undefined; // current node in loops

  // make sure Start and End are Intersections despite not actually having 3 valid directions
  const startPosStr = positionToString(startPos);
  const start: Intersection = intersections.get(startPosStr) || {
    pos: { x: 0, y: 0 }
  };
  Object.assign(start, { up: null, left: null });
  intersections.set(startPosStr, start);
  const endPosStr = positionToString(endPos);
  const end: Intersection = intersections.get(endPosStr) || { pos: endPos };
  Object.assign(end, { down: null, right: null });
  intersections.set(endPosStr, end);

  // connect intersections
  queue.push(start);
  const findPath = createPathFinder(map, intersections);
  while ((node = queue.shift())) {
    if (connected.has(node)) continue; // infinite loop protection

    // DEBUG
    if (useLog) {
      log.debug(`Connecting Intersection at ${positionToString(node.pos)}`);
    }

    const nextNodes = [
      findPath(node, "up"),
      findPath(node, "right"),
      findPath(node, "down"),
      findPath(node, "left")
    ];

    // queue intersections we found
    for (const next of nextNodes) {
      if (next === null || connected.has(next.to)) continue;
      queue.push(next.to);
    }

    // remember that we processed this one
    connected.add(node);
  }

  // DEBUG
  if (useLog) {
    log.debug(
      `Found ${intersections.size} Intersections (incl. Start and End)`
    );
  }

  // rank connections by cheapest path to get there
  const rankQueue = [start];
  while ((node = rankQueue.pop())) {
    let cost: number;
    // figuring out cost in a way typescript is happy with is awful lol
    if (!node.cheapestVia) {
      if (node.pos.x > 0 && node.pos.y > 0) {
        throw new Error("Unexpected Ranking Loop Error");
      }
      cost = 0;
    } else {
      cost = node.cheapestVia.totalCost;
    }

    // DEBUG
    if (useLog) {
      log.debug(
        `Ranking Intersections connected with ${positionToString(node.pos)} at cost ${cost}`
      );
    }

    const queued = new Set(rankQueue);
    const nextNodes = [
      rankNode(node, "up", cost),
      rankNode(node, "right", cost),
      rankNode(node, "down", cost),
      rankNode(node, "left", cost)
    ];

    nextNodes.forEach(node => {
      if (!node || queued.has(node)) return;
      rankQueue.push(node);
    });

    rankQueue.sort((a, b) => {
      const aPrio = a.cheapestVia?.totalCost ?? Infinity;
      const bPrio = b.cheapestVia?.totalCost ?? Infinity;
      return bPrio - aPrio;
    });

    node.done = true;
  }

  if (!end.done || !end.cheapestVia) {
    return null;
  }

  return end.cheapestVia.totalCost;
}
