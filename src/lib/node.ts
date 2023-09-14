import type { Position } from "./types";

export class Node {
  readonly position: Position;

  private _f: number;
  private _g: number;
  private _h: number;
  private _parent: Node | null;
  private _isWalkable;
  private _isOpened;
  private _isClosed;

  constructor(position: Position) {
    this.position = position;
    this._f = 0;
    this._g = 0;
    this._h = 0;
    this._parent = null;
    this._isWalkable = true;
    this._isOpened = false;
    this._isClosed = false;
  }

  calculateF() {
    this._f = this._g + this._h;
  }

  clearFGH() {
    this._f = 0;
    this._g = 0;
    this._h = 0;
  }

  get f() {
    return this._f;
  }

  get g() {
    return this._g;
  }

  get h() {
    return this._h;
  }

  get parent() {
    return this._parent;
  }

  get isWalkable() {
    return this._isWalkable;
  }

  get isOpened() {
    return this._isOpened;
  }

  get isClosed() {
    return this._isClosed;
  }

  set g(value: number) {
    this._g = value;
    this.calculateF();
  }

  set h(value: number) {
    this._h = value;
    this.calculateF();
  }

  set parent(value: Node | null) {
    this._parent = value;
  }

  set isWalkable(value: boolean) {
    this._isWalkable = value;
  }

  set isOpened(value: boolean) {
    this._isOpened = value;
  }

  set isClosed(value: boolean) {
    this._isClosed = value;
  }
}
