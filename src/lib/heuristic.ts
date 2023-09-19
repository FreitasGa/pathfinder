import type { Node } from "./node";
import { Heuristic } from "../types";

export function manhattan(start: Node, goal: Node, weight: number) {
  const dx = Math.abs(start.position[0] - goal.position[0]);
  const dy = Math.abs(start.position[1] - goal.position[1]);

  return (dx + dy) * weight;
}

export function euclidean(start: Node, goal: Node, weight: number) {
  const dx = Math.abs(start.position[0] - goal.position[0]);
  const dy = Math.abs(start.position[1] - goal.position[1]);

  return Math.sqrt(dx * dx + dy * dy) * weight;
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
  weight: number,
  heuristic: Heuristic
) {
  return heuristics[heuristic](start, goal, weight);
}
