<script>
  import Icon from "./icon.svelte";

  let links = [
    {
      id: 1,
      url: "https://github.com/dynamic1717",
      icon: "github",
    },
    {
      id: 2,
      url: "https://www.linkedin.com/in/andrey-paskarenko-5a210825a/",
      icon: "linkedin",
    },
  ];
</script>

<header class="flex items-center justify-between py-4">
  <a href="/" title="Too Sensitive AI">TSAI</a>

  <div class="grid grid-cols-2 gap-3">
    {#each links as { id, url, icon }}
      <a href={url} target="_blank" rel="noreferrer" title={icon}>
        <Icon
          class="h-6 w-6 fill-primary transition-colors hover:fill-highlightFirst"
          name={icon}
        />
      </a>
    {/each}
  </div>
</header>
