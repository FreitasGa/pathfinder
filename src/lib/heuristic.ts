import { Heuristic } from "../types";
import type { Node } from "./node";

export function manhattan(start: Node, goal: Node) {
  const dx = Math.abs(start.position[0] - goal.position[0]);
  const dy = Math.abs(start.position[1] - goal.position[1]);

  return dx + dy;
}

export function euclidean(start: Node, goal: Node) {
  const dx = Math.abs(start.position[0] - goal.position[0]);
  const dy = Math.abs(start.position[1] - goal.position[1]);

  return Math.sqrt(dx * dx + dy * dy);
}

const heuristics: Record<Heuristic, (start: Node, goal: Node) => number> = {
  [Heuristic.Manhattan]: manhattan,
  [Heuristic.Euclidean]: euclidean,
};

export function calculateHeuristic(
  start: Node,
  goal: Node,
  heuristic: Heuristic
) {
  return heuristics[heuristic](start, goal);
}
