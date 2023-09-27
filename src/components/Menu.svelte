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
  import "./menu.css"

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

<nav id="menu">
  <select id="search" bind:value={algorithm}>
    <option value={Algorithm.AStar}>A*</option>
    <option value={Algorithm.Dijkstra}>Dijkstra</option>
  </select>
  <button class="button" id="start" on:click={handleStart}>Start</button>
  <button class="button" id="reset-path" on:click={handleResetPath}>Reset Path</button>
  <button class="button" id="reset-walls" on:click={handleResetWalls}>Reset Walls</button>
</nav>
