export enum Heuristic {
  Manhattan,
  Euclidean,
  // Chebyshev,
  // Octile,
}

export enum State {
  Idle,
  Animating,
  Searching,
  Finished,
}

export type Position = [number, number];
