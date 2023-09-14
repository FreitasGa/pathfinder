<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { defaults, wait } from "../lib/utils";
  import { goal, grid, start } from "../stores";
  import Node from "./Node.svelte";
  import { get } from "svelte/store";

  function handleClick(event: CustomEvent<{ key: string }>) {
    const { key } = event.detail;
    const startNode = get(start);
    const goalNode = get(goal);

    grid.update((value) => {
      const node = value.getNode(key)!;

      if (
        startNode &&
        node.position[0] === startNode.position[0] &&
        node.position[1] === startNode.position[1]
      ) {
        return value;
      }

      if (
        goalNode &&
        node.position[0] === goalNode.position[0] &&
        node.position[1] === goalNode.position[1]
      ) {
        return value;
      }

      node.isWalkable = !node.isWalkable;
      value.setNode(key, node);

      return value;
    });
  }

  onMount(() => {
    const newGrid = $grid;

    let wallIndex = 0;
    const interval = setInterval(() => {
      const wall = defaults.walls[wallIndex];
      const node = newGrid.getNode(wall.toString())!;
      node.isWalkable = false;
      newGrid.setNode(wall.toString(), node);

      grid.update(() => newGrid);

      if (wallIndex === defaults.walls.length - 1) {
        clearInterval(interval);
      }

      wallIndex++;
    }, 150);

    start.update(() => {
      return newGrid.getNode(defaults.start.toString())!;
    });

    goal.update(() => {
      return newGrid.getNode(defaults.goal.toString())!;
    });
  });
</script>

<div class="grid">
  {#each $grid.matrix as row}
    <div class="row">
      {#each row as column}
        {#if $start?.position[0] === column.position[0] && $start.position[1] === column.position[1]}
          <Node node={column} start={true} on:click={handleClick} />
        {:else if $goal?.position[0] === column.position[0] && $goal.position[1] === column.position[1]}
          <Node node={column} goal={true} on:click={handleClick} />
        {:else}
          <Node node={column} on:click={handleClick} />
        {/if}
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
