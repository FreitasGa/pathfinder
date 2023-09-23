<script lang="ts">
  import { get } from "svelte/store";
  import { grid } from "../stores";
  import { aStar } from "../lib/path";
  import { animateOpenedAndClosed, animatePath } from "../animations/grid";

  async function handleStart() {
    const currentGrid = get(grid);

    const { opened, closed, path } = aStar(currentGrid);
    
    await animateOpenedAndClosed(opened, closed);
    await animatePath(path);
  }
</script>

<nav>
  <button on:click={handleStart}>Start</button>
</nav>
