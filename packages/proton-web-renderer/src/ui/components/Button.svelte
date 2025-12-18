<script lang="ts">
  import type {ClassValue, MouseEventHandler} from 'svelte/elements'
  import type {Snippet} from 'svelte'
  import type {UIButtonAppearance} from '../interfaces'

  let {
    onclick,
    content,
    class: className,
    appearance = 'primary',
    label,
    full,
    align = 'left',
    href,
    targetSelf,
  }: {
    onclick?: MouseEventHandler<HTMLButtonElement> | null | undefined
    content?: Snippet
    class?: ClassValue
    appearance?: UIButtonAppearance
    label?: string
    full?: boolean
    align?: 'left' | 'center' | 'between'
    href?: string
    targetSelf?: boolean
  } = $props()

  let alignClass = $derived.by(() => `btn--${align}`)
  let tag: 'a' | 'button' = $derived.by(() => (href ? 'a' : 'button'))
  let target: '_blank' | undefined = $derived.by(() =>
    tag === 'a' && !targetSelf ? '_blank' : undefined
  )
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
  this={tag}
  {onclick}
  class={['btn', className, alignClass, full && 'btn--full']}
  {href}
  {target}
  type="button"
  data-appearance={appearance}
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
    text-decoration: none;

    &[data-appearance='primary'] {
      border: 1px solid var(--button-primary-border);
      background-color: transparent;

      @include mixins.hover {
        border-color: var(--button-primary-border-hover);
        background-color: var(--button-primary-background-hover);
      }
    }

    &[data-appearance='outlined'] {
      border: 1px solid var(--button-outlined-border);

      @include mixins.hover {
        border-color: var(--button-outlined-border-hover);
      }
    }

    &[data-appearance='secondary'] {
      z-index: 1;
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

      @include mixins.hover {
        --ui-btn-bg: linear-gradient(
          107.09deg,
          rgba(112, 19, 197, 0.5) 11.76%,
          rgba(115, 48, 215, 0.5) 38.53%,
          rgba(117, 67, 227, 0.5) 50%,
          rgba(249, 78, 108, 0.5) 61.47%,
          rgba(252, 146, 55, 0.5) 69.12%,
          rgba(255, 211, 5, 0.5) 76.77%,
          rgba(32, 191, 85, 0.5) 88.24%
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

    &[data-appearance='accent'] {
      background: var(--button-accent-background);
      color: var(--button-accent-text);

      @include mixins.hover {
        background: var(--button-accent-background-hover);
      }
    }

    &[data-appearance='flat'] {
      color: var(--button-flat-text);
      font-size: var(--text-sm);
      font-style: normal;
      font-weight: 500;
      line-height: 100%;
      letter-spacing: -0.42px;

      @include mixins.hover {
        color: var(--button-flat-text-hover);
      }
    }
  }
</style>
