<script>
  import { fade } from 'svelte/transition'
  import Chat from '../components/chat.svelte'
  import { onMount } from 'svelte'

  let mounted = false

  onMount(() => {
    mounted = true
  })
</script>

<svelte:head>
  <title>Too Sensitive AI</title>
</svelte:head>

<section class="flex w-full flex-grow flex-col justify-between py-10">
  {#if mounted}
    <div transition:fade class="text-center">
      <h1 class="text-6xl capitalize">Too sensitive AI</h1>
      <h2 class="mt-4 text-2xl text-highlightSecond">
        Project for lulz. Just a joke.
      </h2>
    </div>
    <div transition:fade={{ delay: 200 }}>
      <Chat />
    </div>
  {/if}
</section>
