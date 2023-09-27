<script lang="ts">
  import Grid from "./components/Grid.svelte";
  import Menu from "./components/Menu.svelte";
  import "./app.css";
</script>

<section
  class="flex flex-col items-center justify-center gap-8 min-h-screen bg-gradient-to-t from-[#120c56] to-[#000000]"
>
  <Menu />
  <main class="flex mb-10">
    <Grid />
  </main>
</section>
