import { get } from "svelte/store";

import { size } from "../stores";
import { Node } from "./node";

export class Grid {
  private _nodes: Map<string, Node>;
  private _size: [number, number];

  start: Node | null;
  goal: Node | null;
  path: Node[];

  constructor(nodes?: Map<string, Node>) {
    this._size = get(size);
    this.start = null;
    this.goal = null;
    this.path = [];

    if (nodes) {
      this._nodes = nodes;
    } else {
      this._nodes = this.create();
    }
  }

  protected create() {
    const nodes: Map<string, Node> = new Map();
    const [width, height] = get(size);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const node = new Node([x, y]);
        const key = node.position.toString();
        nodes.set(key, node);
      }
    }

    return nodes;
  }

  getNode(key: string) {
    return this._nodes.get(key);
  }

  setNode(key: string, node: Node) {
    this._nodes.set(key, node);
  }

  setStart(key: string) {
    const node = this.getNode(key)!;

    if (this.goal && node.samePosition(this.goal)) {
      this.goal = null;
    }

    this.start = node;
    this.setNode(key, node);
  }

  setGoal(key: string) {
    const node = this.getNode(key)!;

    if (this.start && node.samePosition(this.start)) {
      this.start = null;
    }

    this.goal = node;
    this.setNode(key, node);
  }

  toggleWall(key: string) {
    const node = this.getNode(key)!;

    if (
      (this.start && node.samePosition(this.start)) ||
      (this.goal && node.samePosition(this.goal))
    ) {
      return;
    }

    node.walkable = !node.walkable;
    this.setNode(key, node);
  }

  get matrix() {
    const matrix: Node[][] = [];

    for (let y = 0; y < this._size[1]; y++) {
      matrix[y] = [];
      for (let x = 0; x < this._size[0]; x++) {
        matrix[y][x] = this.getNode([x, y].toString())!;
      }
    }

    return matrix;
  }
}
