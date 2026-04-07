<script lang="ts">
  import type {MouseEventHandler} from 'svelte/elements'
  import type {UIIcon} from './icons/icons'
  import Icon from './icons/Icon.svelte'
  import Button from './Button.svelte'

  let {
    onclick,
    icon,
    label,
    sublabel,
  }: {
    onclick?: MouseEventHandler<HTMLButtonElement> | null | undefined
    icon?: UIIcon
    label: string
    sublabel?: string
  } = $props()
</script>

<Button {onclick} full appearance="primary">
  {#snippet content()}
    <span class="wallet">
      <span>
        {#if icon}
          <Icon name={icon} class="btn-icon" size="var(--space-2xl)" />
        {/if}
      </span>
      <span class="content">
        <span class="btn-label">{label}</span>
        <span class="btn-sublabel">{sublabel}</span>
      </span>
    </span>
  {/snippet}
</Button>

<style lang="scss">
  @use '../../styles/mixins.scss';

  .wallet {
    display: grid;
    grid-template-columns: var(--space-2xl) auto;
    gap: var(--space-l);
    align-items: center;
  }

  .content {
    display: block;
  }
</style>
