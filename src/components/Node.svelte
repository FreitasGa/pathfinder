<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { Node } from "../lib/node";
  import type { Position } from "../lib/types";
  import { calculateColor } from "../lib/utils";

  export let node: Node;
  export let start: boolean = false;
  export let goal: boolean = false;
  export let path: boolean = false;

  interface Events {
    click: {
      key: string;
    };
  }

  const dispatch = createEventDispatcher<Events>();

  $: color = calculateColor(node, start, goal, path);

  function handleClick() {
    dispatch("click", {
      key: node.position.toString(),
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="node {(start || goal) && 'start-goal'}"
  style="background-color: {color};"
  role="button"
  tabindex="0"
  on:click={handleClick}
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
  }

  .start-goal {
    font-weight: bold;
    user-select: none;
  }
</style>
