<script>
  import { fade } from 'svelte/transition'
  import Chat from '../components/chat.svelte'
</script>

<svelte:head>
  <title>Too Sensitive AI</title>
</svelte:head>

<section class="flex w-full flex-grow flex-col py-10">
  <div class="text-center">
    <h1 transition:fade class="text-6xl capitalize">Too sensitive AI</h1>
    <h2 transition:fade class="mt-4 text-2xl text-highlightSecond">
      Project for lulz. Just a joke.
    </h2>
  </div>
  <div class="mt-auto">
    <Chat />
  </div>
</section>
