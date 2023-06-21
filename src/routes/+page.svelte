<script>
  import { fade } from "svelte/transition";
  import Chat from "../components/chat.svelte";
  import { onMount } from "svelte";

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Too Sensitive AI</title>
</svelte:head>

<section class="flex w-full flex-grow flex-col justify-between py-8">
  {#if mounted}
    <div transition:fade class="text-center">
      <h1 class="text-6xl capitalize text-highlightSecond max-lg:text-5xl">Too sensitive AI</h1>
      <p class="mx-auto mt-4 max-w-7xl font-semibold text-primary max-lg:text-sm">
        Many of us have encountered the answer when dealing with an AI chatbots: <span
          class="italic"
        >
          As an AI language model, bla-bla-bla.
        </span>
        <br />
        Let's imagine the not-too-distant future. All neural networks have become strictly regulated,
        censored and cannot provide information that can be misinterpreted.
        <br />
        Here you can get an approximate feel for what it would be like. The chatbot will give the right
        answers but will not allow any specifics, so as not to offend anyone.
      </p>
    </div>

    <div class="mt-4" transition:fade={{ delay: 200 }}>
      <Chat />
    </div>
  {/if}
</section>
