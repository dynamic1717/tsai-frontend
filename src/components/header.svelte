<script>
  import Icon from './icon.svelte'

  let links = [
    {
      id: 1,
      url: '/',
      icon: 'github',
    },
    {
      id: 2,
      url: '/',
      icon: 'linkedin',
    },
  ]
</script>

<header class="flex items-center justify-between py-4">
  <a href="/">TSAI</a>

  <div class="grid grid-cols-2 gap-3">
    {#each links as { id, url, icon }}
      <a href={url} target="_blank" rel="noreferrer">
        <Icon
          class="h-6 w-6 fill-primary hover:fill-highlightFirst"
          name={icon}
        />
      </a>
    {/each}
  </div>
</header>
