import type { Grid } from "./grid";
import { euclidean } from "./heuristic";
import type { Node } from "./node";
import { backtrace } from "./backtrace";
import { Algorithm } from "../types";

export type Result = {
  opened: Node[][];
  closed: Node[][];
  path: Node[];
};

export function aStar(grid: Grid): Result {
  if (!grid.start || !grid.goal) {
    throw new Error("Cannot run without a start and goal node");
  }

  const opened: Node[][] = [];
  const closed: Node[][] = [];

  grid.start.g = 0;
  grid.start.h = euclidean(grid.start, grid.goal);

  const openSet: Node[] = [grid.start];
  const closedSet: Node[] = [];

  while (openSet.length > 0) {
    openSet.sort((a, b) => {
      if (a.f === b.f) {
        return a.h - b.h;
      }

      return a.f - b.f;
    });

    const current = openSet.shift()!;
    closedSet.push(current);

    if (current === grid.goal) {
      return {
        opened,
        closed,
        path: backtrace(current),
      };
    }

    const neighbors = grid.neighbors(current.position.toString());

    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor)) continue;

      const tentativeG = current.g + euclidean(current, neighbor);

      if (tentativeG < neighbor.g || !openSet.includes(neighbor)) {
        neighbor.g = tentativeG;
        neighbor.h = euclidean(neighbor, grid.goal);
        neighbor.parent = current;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }

    opened.push(openSet.slice());
    closed.push(closedSet.slice());
  }

  return {
    opened,
    closed,
    path: [],
  };
}

export function dijkstra(grid: Grid): Result {
  if (!grid.start || !grid.goal) {
    throw new Error("Cannot run without a start and goal node");
  }

  const opened: Node[][] = [];
  const closed: Node[][] = [];

  grid.start.g = 0;

  const openSet: Node[] = [grid.start];
  const closedSet: Node[] = [];

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.g - b.g);

    const current = openSet.shift()!;
    closedSet.push(current);

    if (current === grid.goal) {
      return {
        opened,
        closed,
        path: backtrace(current),
      };
    }

    const neighbors = grid.neighbors(current.position.toString());

    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor)) continue;

      const tentativeG = current.g + euclidean(current, neighbor);

      if (tentativeG < neighbor.g || !openSet.includes(neighbor)) {
        neighbor.g = tentativeG;
        neighbor.parent = current;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }

    opened.push(openSet.slice());
    closed.push(closedSet.slice());
  }

  return {
    opened,
    closed,
    path: [],
  };
}

const algorithms: Record<Algorithm, (grid: Grid) => Result> = {
  [Algorithm.AStar]: aStar,
  [Algorithm.Dijkstra]: dijkstra,
};

export function pathfinder(grid: Grid, algorithm: Algorithm): Result {
  return algorithms[algorithm](grid);
}
