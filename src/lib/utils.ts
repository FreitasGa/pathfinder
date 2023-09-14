import type { Node } from "./node";
import type { Position } from "./types";

export const defaults = {
  width: 10,
  height: 10,
  start: [4, 9] as Position,
  goal: [4, 1] as Position,
  walls: [
    [5, 0],
    [5, 1],
    [5, 2],
    [4, 2],
    [3, 2],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [3, 7],
    [3, 8],
    [3, 9],
  ] as Position[],
};

export const colors = {
  start: "#0000ff",
  goal: "#0000ff",
  wall: "#000000",
  opened: "#00ff00",
  closed: "#ff0000",
  path: "#ffff00",
  default: "#ffffff",
};

export function calculateColor(
  node: Node,
  start: boolean,
  goal: boolean,
  path: boolean
) {
  if (start) {
    return colors.start;
  } else if (goal) {
    return colors.goal;
  } else if (path) {
    return colors.path;
  } else if (node.isClosed) {
    return colors.closed;
  } else if (node.isOpened) {
    return colors.opened;
  } else if (!node.isWalkable) {
    return colors.wall;
  } else {
    return colors.default;
  }
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
