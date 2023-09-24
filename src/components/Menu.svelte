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
  import { Algorithm, State } from "../types";

  let algorithm: Algorithm = Algorithm.AStar;

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
    const { opened, closed, path } = pathfinder(currentGrid, algorithm);

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
</script>

<nav>
  <select bind:value={algorithm}>
    <option value={Algorithm.AStar}>A*</option>
    <option value={Algorithm.Dijkstra}>Dijkstra</option>
  </select>
  <button on:click={handleStart}>Start</button>
  <button on:click={handleResetPath}>Reset Path</button>
  <button on:click={handleResetWalls}>Reset Walls</button>
</nav>
