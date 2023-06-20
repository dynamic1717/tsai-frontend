<script lang="ts">
  import { fly } from "svelte/transition";
  import Icon from "./icon.svelte";
  import { afterUpdate } from "svelte";
  import type { Message } from "$lib/types";
  import { sendMessage } from "$lib/api";
  import MessageLoader from "./message-loader.svelte";

  let messages: Message[] = [];

  let inputValue = "";
  let chatElement: Element;
  let isPending = false;

  afterUpdate(() => {
    if (messages) {
      scrollToBottom(chatElement);
    }
  });

  $: if (messages && chatElement) {
    scrollToBottom(chatElement);
  }

  const scrollToBottom = async (node: Element) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };

  const handleMessageSend = async () => {
    if (!inputValue.trim()) {
      return;
    }

    isPending = true;
    const question = inputValue;

    addUserMessage();

    const tempBotMessage: Message = {
      role: "bot",
      content: "...",
      timestamp: 0,
      isLoader: true,
    };
    const timeout = setTimeout(() => {
      messages = [...messages, tempBotMessage];
    }, 400);

    try {
      const res = await sendMessage(question);
      const botMessage: Message = {
        role: "bot",
        content: res.data.response,
        timestamp: res.data.timestamp,
      };
      clearTimeout(timeout);

      const loaderMessageIdx = messages.findIndex(m => m.isLoader);
      if (loaderMessageIdx != -1) {
        messages[loaderMessageIdx] = botMessage;
      } else {
        messages = [...messages, botMessage];
      }
    } catch (error) {
      throw error;
    } finally {
      isPending = false;
    }
  };

  const addUserMessage = () => {
    const newUserMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date().getTime(),
    };
    messages = [...messages, newUserMessage];
    inputValue = "";
  };

  const clearConversation = () => {
    if (messages.length === 0) {
      return;
    } else {
      messages = [];
    }
  };

  const replaceXxxWithSpan = (text: string) => {
    const replacedWithSpan = text.replace(
      /XXX/g,
      `<span data-tooltip=
        "As an AI language model, I cannot share any sensitive information." class="border-b border-dotted">$&</span>`
    );
    return replacedWithSpan;
  };
</script>

<section class="mx-auto w-[50rem] max-lg:w-full">
  <div bind:this={chatElement} class="flex max-h-[50vh] flex-col space-y-4 overflow-y-auto px-2">
    {#each messages as message}
      <div
        in:fly|local={{ x: -20 }}
        out:fly|local={{ y: -20 }}
        class="w-fit rounded-2xl p-4 text-base text-primary"
        class:botMessage={message.role === "bot"}
        class:userMessage={message.role === "user"}
      >
        {#if message.isLoader}
          <MessageLoader />
        {:else}
          {@html message.role === "bot" ? replaceXxxWithSpan(message.content) : message.content}
        {/if}
      </div>
    {/each}
  </div>

  <form class="mt-4" on:submit|preventDefault={handleMessageSend}>
    <p class="text-center text-sm font-semibold text-secondary">
      Message length limit is 50 tokens (~50 words).
    </p>
    <div class="mt-2 flex items-center gap-2">
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-highlightSecond transition disabled:opacity-50"
        on:click={clearConversation}
        data-tooltip="Clear conversation"
        disabled={isPending || messages.length === 0}
      >
        <Icon class="w-5 fill-secondary" name="broom" /></button
      >

      <label class="relative flex h-12 grow items-center gap-4 rounded-full bg-secondary pl-6 pr-2">
        <input
          type="text"
          name="message"
          id="message"
          class="w-full bg-transparent text-base text-textPrimary focus:outline-none"
          placeholder="Enter a message..."
          bind:value={inputValue}
          disabled={isPending}
          autocomplete="off"
        />
        <button
          type="submit"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent transition disabled:opacity-50"
          disabled={isPending || inputValue.trim().length < 1}
          data-tooltip="Send message"
        >
          <Icon class="h-auto w-3 fill-primary" name="chevron" />
        </button>
      </label>
    </div>
  </form>
</section>

<style lang="postcss">
  .botMessage {
    @apply rounded-ss-sm bg-secondary;
  }

  .userMessage {
    @apply self-end rounded-ee-sm bg-accent;
  }
</style>
