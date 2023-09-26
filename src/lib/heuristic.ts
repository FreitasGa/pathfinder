import type { Node } from "./node";

export function euclidean(start: Node, goal: Node) {
  const dx = Math.abs(start.position[0] - goal.position[0]);
  const dy = Math.abs(start.position[1] - goal.position[1]);

  if (dx > dy) {
    return 14 * dy + 10 * (dx - dy);
  }

  return 14 * dx + 10 * (dy - dx);
}
