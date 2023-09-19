<script lang="ts">
  import Grid from "./components/Grid.svelte";
  import Menu from "./components/Menu.svelte";
</script>

<section class="section">
  <Menu />
  <main class="main">
    <Grid />
  </main>
</section>

<style>
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }
  .main {
    display: flex;
    margin-top: 10rem;
  }
</style>
