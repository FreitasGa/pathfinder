import type { Heuristic } from "../types";
import type { Grid } from "./grid";
import { calculateHeuristic } from "./heuristic";
import type { Node } from "./node";
import { backtrace } from "./backtrace";

export type Result = {
  opened: Node[];
  closed: Node[];
  path: Node[];
};

export function aStar(grid: Grid, heuristic: Heuristic): Result {
  if (!grid.start || !grid.goal) {
    throw new Error("Start and goal nodes must be set");
  }

  const opened: Node[] = [];
  const closed: Node[] = [];

  grid.start.g = 0;
  grid.start.h = calculateHeuristic(grid.start, grid.goal, heuristic);

  opened.push(grid.start);

  while (opened.length > 0) {
    const current = opened.shift()!;
    closed.push(current);

    if (current.samePosition(grid.goal)) {
      return {
        opened,
        closed,
        path: backtrace(current),
      };
    }

    const neighbors = grid.neighbors(current.position.toString());

    for (const neighbor of neighbors) {
      if (!neighbor.walkable || closed.includes(neighbor)) {
        continue;
      }

      const g = current.g + 1;

      if (!opened.includes(neighbor) || g < neighbor.g) {
        neighbor.g = g;
        neighbor.h = calculateHeuristic(neighbor, grid.goal, heuristic);
        neighbor.parent = current;

        if (!opened.includes(neighbor)) {
          opened.push(neighbor);
        }
      }
    }

    opened.sort((a, b) => a.f - b.f);
  }

  return {
    opened,
    closed,
    path: [],
  };
}

export function dijkstra(grid: Grid, heuristic: Heuristic): Result {
  if (!grid.start || !grid.goal) {
    throw new Error("Start and goal nodes must be set");
  }

  const opened: Node[] = [];
  const closed: Node[] = [];

  grid.start.g = 0;

  opened.push(grid.start);

  while (opened.length > 0) {
    const current = opened.shift()!;
    closed.push(current);

    if (current.samePosition(grid.goal)) {
      return {
        opened,
        closed,
        path: backtrace(current),
      };
    }

    const neighbors = grid.neighbors(current.position.toString());

    for (const neighbor of neighbors) {
      if (!neighbor.walkable || closed.includes(neighbor)) {
        continue;
      }

      const g = current.g + 1;

      if (!opened.includes(neighbor) || g < neighbor.g) {
        neighbor.g = g;
        neighbor.parent = current;

        if (!opened.includes(neighbor)) {
          opened.push(neighbor);
        }
      }
    }

    opened.sort((a, b) => a.f - b.f);
  }

  return {
    opened,
    closed,
    path: [],
  };
}
