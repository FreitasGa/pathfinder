import type { Node } from "./node";
import type { Position } from "../types";

export function backtrace(node: Node) {
  const path: Node[] = [node];

  while (node.parent) {
    path.unshift(node.parent);
    node = node.parent;
  }

  return path;
}
