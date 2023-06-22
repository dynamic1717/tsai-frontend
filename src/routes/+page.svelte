<script>
  import { onMount } from "svelte";
  import Hero from "$lib/components/hero.svelte";
  import Chat from "$lib/components/chat.svelte";

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Too Sensitive AI</title>
</svelte:head>

<div class="flex w-full flex-grow flex-col justify-between py-8">
  {#if mounted}
    <Hero />

    <Chat />
  {/if}
</div>
