<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  import { animateWalls } from "../animations/grid";
  import { defaults } from "../lib/utils";
  import { grid, state } from "../stores";
  import { State } from "../types";
  import Node from "./Node.svelte";

  let mouseDown = false;

  function handleMouseDown(
    event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
  ) {
    const key = (event.target as EventTarget & HTMLDivElement).dataset.key!;
    const currentState = get(state);

    if (currentState !== State.Idle) {
      return;
    }

    mouseDown = true;
    grid.update((value) => {
      value.toggleWall(key);
      return value;
    });
  }

  function handleMouseOver(
    event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
  ) {
    const key = (event.target as EventTarget & HTMLDivElement).dataset.key!;
    const currentState = get(state);

    if (currentState !== State.Idle || !mouseDown) {
      return;
    }

    grid.update((value) => {
      value.toggleWall(key);
      return value;
    });
  }

  function handleMouseUp() {
    mouseDown = false;
  }

  function handleMouseLeave() {
    mouseDown = false;
  }

  async function handleResetGrid() {
    const currentState = get(state);

    if (currentState !== State.Idle) {
      throw new Error("Cannot reset grid while not idle");
    }

    state.set(State.Animating);

    grid.update((value) => {
      value.setStart(defaults.start.toString());
      value.setGoal(defaults.goal.toString());

      return value;
    });

    await animateWalls(defaults.walls);

    state.set(State.Idle);
  }

  onMount(() => {
    handleResetGrid();
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  class="grid"
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mouseover={handleMouseOver}
  on:mouseleave={handleMouseLeave}
>
  {#each $grid.matrix as row}
    <div class="row">
      {#each row as node}
        <Node
          bind:node
          start={$grid.start !== null ? node.samePosition($grid.start) : false}
          goal={$grid.goal !== null ? node.samePosition($grid.goal) : false}
          path={$grid.path.some((n) => node.samePosition(n))}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .grid {
    display: table;
    border: 2px solid black;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .row {
    display: table-row;
  }
</style>
