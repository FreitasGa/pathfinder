<script lang="ts">
  import { get } from "svelte/store";

  import type { Node } from "../lib/node";
  import { calculateColor } from "../lib/utils";
  import { grid, state } from "../stores";
  import { State } from "../types";

  export let node: Node;
  export let start: boolean = false;
  export let goal: boolean = false;
  export let path: boolean = false;

  $: color = calculateColor(node, start, goal, path);

  function handleMouseDown() {
    const currentState = get(state);

    if (currentState !== State.Idle) {
      throw new Error("Cannot toggle walls while not idle");
    }

    grid.update((value) => {
      value.toggleWall(node.position.toString());
      return value;
    });
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function handleDragStart(
    event: DragEvent & { currentTarget: EventTarget & HTMLDivElement }
  ) {
    const data = {
      start,
      goal,
    };

    event.dataTransfer!.dropEffect = "copy";
    event.dataTransfer!.setData("text", JSON.stringify(data));
  }

  function handleDrop(
    event: DragEvent & { currentTarget: EventTarget & HTMLDivElement }
  ) {
    event.preventDefault();

    const currentState = get(state);

    if (currentState !== State.Idle) {
      throw new Error("Cannot move start/goal while not idle");
    }

    const rawData = event.dataTransfer?.getData("text");

    if (!rawData) {
      return;
    }

    const data: {
      start: boolean;
      goal: boolean;
    } = JSON.parse(rawData);

    grid.update((value) => {
      if ((data.start || data.goal) && !node.walkable) {
        value.toggleWall(node.position.toString());
      }

      if (data.start) {
        value.setStart(node.position.toString());
      } else if (data.goal) {
        value.setGoal(node.position.toString());
      }

      return value;
    });
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="node {(start || goal) && 'start-goal'}"
  style="background-color: {color};"
  draggable={start || goal}
  on:mousedown={handleMouseDown}
  on:dragover={handleDragOver}
  on:dragstart={handleDragStart}
  on:drop={handleDrop}
>
  {#if start}
    S
  {:else if goal}
    G
  {/if}
</div>

<style>
  .node {
    display: table-cell;
    border: 1px solid black;
    width: 50px;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    transition: background-color 0.5s ease;
    color: white;
  }

  .start-goal {
    font-weight: bold;
    user-select: none;
    cursor: grab;
  }
</style>
