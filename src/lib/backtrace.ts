import type { Node } from "./node";
import type { Position } from "../types";

export function backtrace(
  node: Node,
  includeStart: boolean = false,
  includeEnd: boolean = false
) {
  const path: Position[] = [];
  let current = includeEnd ? node : node.parent;

  while (current?.parent) {
    path.push(current.position);
    current = current.parent;
  }

  if (includeStart) {
    path.push(node.position);
  }

  return path.reverse();
}
