<script lang="ts">
  import type { Node } from "../lib/node";
  import { calculateColor } from "../lib/utils";

  export let node: Node;
  export let start: boolean = false;
  export let goal: boolean = false;
  export let path: boolean = false;

  $: color = calculateColor(node, start, goal, path);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="node {(start || goal) && 'start-goal'}"
  style="background-color: {color};"
  data-key={node.position.toString()}
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
  }
</style>
