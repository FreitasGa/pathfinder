<script lang="ts">
  function handleStart() {
    console.log("start");
  }
</script>

<nav>
  <button on:click={handleStart}>Start</button>
</nav>
