import type { Grid } from "./grid";
import { euclidean } from "./heuristic";
import type { Node } from "./node";
import { backtrace } from "./backtrace";

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
    const current = openSet[0];

    opened.push([current]);
    closed.push([...closedSet]);

    if (current === grid.goal) {
      return {
        opened,
        closed,
        path: backtrace(current),
      };
    }

    openSet.shift();
    closedSet.push(current);

    for (const neighbor of grid.neighbors(current.position.toString())) {
      if (!neighbor.walkable || closedSet.includes(neighbor)) continue;

      const g = current.g + euclidean(current, neighbor);

      if (!openSet.includes(neighbor)) {
        neighbor.g = g;
        neighbor.h = euclidean(neighbor, grid.goal);
        neighbor.parent = current;

        openSet.push(neighbor);
      } else if (g < neighbor.g) {
        neighbor.g = g;
        neighbor.parent = current;
      }
    }

    openSet.sort((a, b) => a.f - b.f);
  }

  return {
    opened,
    closed,
    path: [],
  };
}
