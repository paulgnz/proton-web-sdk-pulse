<script lang="ts">
  import type {Snippet} from 'svelte'

  let {
    content,
    footer,
  }: {
    content?: Snippet
    footer?: Snippet
  } = $props()
</script>

<article>
  <section>
    {@render content?.()}
  </section>
  {#if footer}
    <footer>
      {@render footer()}
    </footer>
  {/if}
</article>

<style lang="scss">
  article {
    height: 452px;
    min-height: 0;
    display: grid;
    grid-template-rows: 1fr max-content;
    grid-template-areas: 'content' 'footer';
    box-sizing: border-box;
  }

  section {
    grid-area: content;
    overflow: hidden;
    overflow-y: scroll;
    box-sizing: border-box;

    // Give Chrome some nicer scrollbars
    scrollbar-gutter: stable both-edges;
    scrollbar-color: var(--body-background);

    &::-webkit-scrollbar {
      width: 2px;
      background-color: var(--body-background);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--body-background);
    }
  }

  footer {
    grid-area: footer;

    border: 1px solid green;
  }
</style>
