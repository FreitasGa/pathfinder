import type { Node } from "./node";

export function euclidean(start: Node, goal: Node) {
  const dx = Math.abs(start.position[0] - goal.position[0]);
  const dy = Math.abs(start.position[1] - goal.position[1]);

  // return Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10;
  return Math.sqrt(dx * dx + dy * dy);
}
