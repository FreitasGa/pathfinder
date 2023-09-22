<script lang="ts">
  import { get } from "svelte/store";
  import { grid } from "../stores";
  import { aStar } from "../lib/path";
  import { Heuristic } from "../types";
  import { animatePath } from "../animations/grid";

  function handleStart() {
    console.log("start");

    const currentGrid = get(grid);

    const { opened, closed, path } = aStar(currentGrid, Heuristic.Euclidean);
    console.log(opened, closed, path);

    animatePath(path);
  }
</script>

<nav>
  <button on:click={handleStart}>Start</button>
</nav>
