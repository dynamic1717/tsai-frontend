<script lang="ts">
  import { slide, fly, fade } from 'svelte/transition'
  import Icon from './icon.svelte'
  import { afterUpdate } from 'svelte'
  // @ts-ignore
  import { tooltip } from '@svelte-plugins/tooltips'

  type Message = {
    role: 'user' | 'bot'
    content: string
    timestamp: number
  }

  let messages: Message[] = [
    {
      role: 'user',
      content: 'Hello',
      timestamp: 0,
    },
    {
      role: 'bot',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, fugiat.',
      timestamp: 0,
    },
    {
      role: 'user',
      content: 'Hello',
      timestamp: 0,
    },
    {
      role: 'bot',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, fugiat.',
      timestamp: 0,
    },
  ]

  let inputValue = ''
  let chatElement: Element
  let isPending = false

  afterUpdate(() => {
    if (messages) {
      scrollToBottom(chatElement)
    }
  })

  $: if (messages && chatElement) {
    scrollToBottom(chatElement)
  }

  const scrollToBottom = async (node: Element) => {
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' })
  }

  const handleMessageSend = async () => {
    if (!inputValue.trim()) {
      return
    }
    isPending = true
    const question = inputValue

    addUserMessage()

    const tempBotMessage: Message = {
      role: 'bot',
      content: '...',
      timestamp: 0,
    }
    const timeout = setTimeout(() => {
      messages = [...messages, tempBotMessage]
    }, 500)

    try {
      const response: Message = {
        role: 'bot',
        content:
          'em ipsum dolor sit amet consectetur adipisicing elit. Id, fugiat.',
        timestamp: 0,
      }
      console.log(messages)
      setTimeout(() => {
        clearTimeout(timeout)

        messages[messages.length - 1] = response
      }, 2000)
    } catch (error) {
      throw error
    } finally {
      isPending = false
    }
  }

  const addUserMessage = () => {
    const newUserMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date().getTime(),
    }
    messages = [...messages, newUserMessage]
    inputValue = ''
  }

  const clearConversation = () => {
    // TODO open popover
    messages = []
  }
</script>

<section class="mx-auto w-[50rem] max-lg:w-full">
  <div
    bind:this={chatElement}
    class="flex max-h-80 flex-col space-y-4 overflow-y-auto px-2"
  >
    {#each messages as message}
      <div
        in:fly|local={{ x: -20 }}
        out:fly|local={{ y: 20 }}
        class="w-fit rounded-2xl p-4 text-base text-primary"
        class:botMessage={message.role === 'bot'}
        class:userMessage={message.role === 'user'}
      >
        {message.content}
      </div>
    {/each}
  </div>

  <form class="mt-4" on:submit|preventDefault={handleMessageSend}>
    <p class="text-center text-sm font-semibold text-secondary">
      Your message length limit is 50 tokens (~50 words).
    </p>
    <div class="mt-2 flex items-center gap-2">
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-highlightSecond transition disabled:opacity-50"
        on:click={clearConversation}
        disabled={messages.length === 0}
      >
        <Icon class="w-5 fill-secondary" name="broom" /></button
      >

      <label
        class="relative flex h-12 grow items-center gap-4 rounded-full bg-secondary pl-6 pr-2"
      >
        <input
          type="text"
          name="message"
          id="message"
          class="w-full bg-transparent text-base text-textPrimary focus:outline-none"
          placeholder="Enter a message..."
          bind:value={inputValue}
          disabled={isPending}
        />
        <button
          type="submit"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent transition disabled:opacity-50"
          disabled={isPending || inputValue.trim().length < 1}
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
