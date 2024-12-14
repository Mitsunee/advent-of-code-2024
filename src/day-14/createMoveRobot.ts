import type { Robot } from "./parseInput";

export function createMoveRobot(width: number, height: number) {
  return function moveRobot(robot: Robot, amount: number) {
    let x = robot.x + robot.move.x * amount;
    x %= width;
    if (x < 0) x += width;

    let y = robot.y + robot.move.y * amount;
    y %= height;
    if (y < 0) y += height;

    Object.assign(robot, { x, y });
  };
}
