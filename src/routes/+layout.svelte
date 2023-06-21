<script>
  import "../app.css";
  import Footer from "../components/footer.svelte";
  import Header from "../components/header.svelte";
</script>

<main class="flex min-h-screen flex-col bg-bgc max-lg:h-auto">
  <div class="container flex h-full grow flex-col px-8 max-lg:px-4">
    <Header />

    <slot />

    <Footer />
  </div>
</main>

<style lang="postcss">
  :global(html) {
    @apply text-textPrimary;
  }
</style>
