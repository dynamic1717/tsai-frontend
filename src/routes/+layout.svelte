<script>
  import "../app.css";
  import Header from "../components/header.svelte";
</script>

<main class="h-screen w-full bg-bgc">
  <div class="container flex h-full flex-col px-8">
    <Header />

    <slot />
  </div>
</main>

<style lang="postcss">
  :global(html) {
    @apply text-textPrimary;

    /* font-size: 1.5vw;

    @media (max-width: 1024px) {
      font-size: 16px;
    } */
  }
</style>
