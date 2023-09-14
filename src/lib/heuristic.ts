import type { Node } from "./node";
import { Heuristic } from "./types";

export function manhattan(start: Node, goal: Node, distance: number): number {
  const [x1, y1] = start.position;
  const [x2, y2] = goal.position;

  return distance + Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function euclidean(start: Node, goal: Node, distance: number): number {
  const [x1, y1] = start.position;
  const [x2, y2] = goal.position;

  return distance + Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

const heuristics: Record<
  Heuristic,
  (start: Node, goal: Node, distance: number) => number
> = {
  [Heuristic.Manhattan]: manhattan,
  [Heuristic.Euclidean]: euclidean,
};

export function heuristic(
  start: Node,
  goal: Node,
  distance: number,
  heuristic: Heuristic
) {
  return heuristics[heuristic](start, goal, distance);
}
