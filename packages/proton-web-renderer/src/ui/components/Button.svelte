<script lang="ts">
  import type {ClassValue, MouseEventHandler} from 'svelte/elements'
  import type {Snippet} from 'svelte'
  import type {UIButtonColor} from '../interfaces'

  let {
    onclick,
    content,
    class: className,
    color = 'primary',
    label,
    full,
    align = 'left',
    href,
  }: {
    onclick?: MouseEventHandler<HTMLButtonElement> | null | undefined
    content?: Snippet
    class?: ClassValue
    color?: UIButtonColor
    label?: string
    full?: boolean
    align?: 'left' | 'center' | 'between'
    href?: string
  } = $props()

  let alignClass = $derived.by(() => `btn--${align}`)
  let tag: 'a' | 'button' = $derived.by(() => (href ? 'a' : 'button'))
  let target: '_blank' | undefined = $derived.by(() => (tag === 'a' ? '_blank' : undefined))
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
  this={tag}
  {onclick}
  class={['btn', className, alignClass, full && 'btn--full']}
  {href}
  {target}
  type="button"
  data-color={color}
>
  {#if content}
    {@render content()}
  {:else if label}
    <span class="btn-label">{label}</span>
  {/if}
</svelte:element>

<style lang="scss">
  @use '../../styles/mixins.scss';
  @use '../../styles/utils.scss';

  .btn {
    @include mixins.button-reset;

    text-align: left;
    border-radius: var(--space-l);
    font-family: var(--text-font);
    padding: var(--space-l);
    display: flex;
    align-items: center;
    gap: var(--space-s);
    color: inherit;
    text-decoration: none;

    &[data-color='primary'] {
      border: 1px solid var(--button-primary-border);

      &:hover {
        border-color: var(--button-primary-border-hover);
      }
    }

    &[data-color='secondary'] {
      z-index: 1;
      --ui-btn-bg: linear-gradient(
        107.09deg,
        rgba(112, 19, 197, 0.3) 11.76%,
        rgba(115, 48, 215, 0.3) 38.53%,
        rgba(117, 67, 227, 0.3) 50%,
        rgba(249, 78, 108, 0.3) 61.47%,
        rgba(252, 146, 55, 0.3) 69.12%,
        rgba(255, 211, 5, 0.3) 76.77%,
        rgba(32, 191, 85, 0.3) 88.24%
      );

      &:hover {
        --ui-btn-bg: linear-gradient(
          107.09deg,
          #7013c5 11.76%,
          #7330d7 38.53%,
          #7543e3 50%,
          #f94e6c 61.47%,
          #fc9237 69.12%,
          #ffd305 76.77%,
          #20bf55 88.24%
        );
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        padding: 1px;
        background: var(--ui-btn-bg);
        mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        mask-composite: exclude;
      }
    }

    &[data-color='accent'] {
      background: var(--button-accent-background);
      color: var(--button-accent-text);
    }
  }
</style>
