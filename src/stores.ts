import { writable } from "svelte/store";
import { Grid } from "./lib/grid";
import { Node } from "./lib/node";
import { defaults } from "./lib/utils";

export const size = writable<[number, number]>([
  defaults.width,
  defaults.height,
]);
export const start = writable<Node | null>(null);
export const goal = writable<Node | null>(null);
export const grid = writable<Grid>(new Grid());
export const opened = writable<Node[]>([]);
export const closed = writable<Node[]>([]);
export const path = writable<Node[]>([]);
