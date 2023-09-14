import { get } from "svelte/store";
import { size } from "../stores";
import { Node } from "./node";
import { defaults } from "./utils";

export class Grid {
  nodes: Map<string, Node>;
  start: Node | null;
  goal: Node | null;

  constructor(nodes?: Map<string, Node>) {
    this.start = null;
    this.goal = null;

    if (nodes) {
      this.nodes = nodes;
    } else {
      const nodes: Map<string, Node> = new Map();
      const [width, height] = get(size);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const node = new Node([x, y]);
          const key = node.position.toString();
          nodes.set(key, node);
        }
      }

      this.nodes = nodes;
    }
  }

  getNode(key: string) {
    return this.nodes.get(key);
  }

  setNode(key: string, node: Node) {
    this.nodes.set(key, node);
  }

  get matrix() {
    const matrix: Node[][] = [];

    for (let y = 0; y < defaults.height; y++) {
      matrix[y] = [];
      for (let x = 0; x < defaults.width; x++) {
        matrix[y][x] = this.getNode([x, y].toString())!;
      }
    }

    return matrix;
  }
}
