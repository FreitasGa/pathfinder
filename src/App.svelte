<script lang="ts">
  import Grid from "./components/Grid.svelte";
  import Menu from "./components/Menu.svelte";
  import "./app.css"
</script>

<section class="flex flex-col items-center min-h-screen bg-gradient-to-t from-[#120c56] to-[#000000]">
  <!-- <div id="star"></div> -->
  <Menu />
  <main class="flex mt-[5rem] mb-10">
    <Grid />
  </main>
</section>
