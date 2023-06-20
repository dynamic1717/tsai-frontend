<script>
  let dotClasses = "h-1 w-1 animate-ping rounded-full bg-highlightSecond";
</script>

<div class="flex items-center space-x-2" title="Bot is typing...">
  <span class={dotClasses} />
  <span class={dotClasses} style="animation-delay: 75ms" />
  <span class={dotClasses} style="animation-delay: 150ms" />
</div>
