<script lang="ts">
  import { get } from "svelte/store";
  import {
    animateOpenedAndClosed,
    animatePath,
    animateWalls,
  } from "../animations/grid";
  import { pathfinder } from "../lib/path";
  import { defaults } from "../lib/utils";
  import { grid, state } from "../stores";
  import { Algorithm, Heuristic, State } from "../types";

  let algorithm: Algorithm = Algorithm.AStar;
  let heuristic: Heuristic = Heuristic.Euclidean;

  async function handleStart() {
    const currentState = get(state);

    if (currentState !== State.Idle) {
      throw new Error("Cannot start while not idle");
    }

    grid.update((value) => {
      value.resetPathOpenedClosed();
      return value;
    });

    const currentGrid = get(grid);
    const { opened, closed, path } = pathfinder(
      currentGrid,
      algorithm,
      heuristic
    );

    await animateOpenedAndClosed(opened, closed);
    await animatePath(path);
  }

  async function handleResetPath() {
    const currentState = get(state);

    if (currentState !== State.Idle) {
      throw new Error("Cannot reset path while not idle");
    }

    grid.update((value) => {
      value.resetPathOpenedClosed();
      return value;
    });
  }

  async function handleResetWalls() {
    const currentState = get(state);

    if (currentState !== State.Idle) {
      throw new Error("Cannot reset walls while not idle");
    }

    grid.update((value) => {
      value.resetPathOpenedClosed();
      return value;
    });

    grid.update((value) => {
      value.resetWalls();
      return value;
    });

    await animateWalls(defaults.walls);
  }

  async function handleResetStartAndGoal() {
    const currentState = get(state);

    if (currentState !== State.Idle) {
      throw new Error("Cannot reset walls while not idle");
    }

    grid.update((value) => {
      value.resetPathOpenedClosed();
      value.setStart(defaults.start.toString());
      value.setGoal(defaults.goal.toString());
      return value;
    });
  }
</script>

<nav>
  <select bind:value={algorithm}>
    <option value={Algorithm.AStar}>A*</option>
    <option value={Algorithm.Dijkstra}>Dijkstra</option>
  </select>
  <select bind:value={heuristic}>
    <option value={Heuristic.Euclidean}>Euclidean</option>
    <option value={Heuristic.Manhattan}>Manhattan</option>
  </select>
  <button on:click={handleStart}>Start</button>
  <button on:click={handleResetPath}>Reset Path</button>
  <button on:click={handleResetWalls}>Reset Walls</button>
  <button on:click={handleResetStartAndGoal}>Reset Start and Goal</button>
</nav>
