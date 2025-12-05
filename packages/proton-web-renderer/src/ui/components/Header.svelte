<script lang="ts">
  import type {Snippet} from 'svelte'
  import {active, router} from '../store'
  import Icon from './icons/Icon.svelte'
  import ButtonIcon from './ButtonIcon.svelte'

  let {
    title,
    showLogo = true,
    showBack = true,
  }: {
    showLogo?: boolean
    showBack?: boolean
    title: string
  } = $props()

  function close() {
    active.set(false)
  }

  function back() {
    router.back()
  }
</script>

<header class="dialog-header">
  <div class="slot left">
    {#if showBack}
      <ButtonIcon icon="arrow-back" onclick={() => back()}></ButtonIcon>
    {/if}
  </div>

  <div class="center">
    <Icon name="web-auth" class="header-icon" />
    {title}
  </div>

  <div class="slot right">
    <ButtonIcon icon="xmark" onclick={() => close()}></ButtonIcon>
  </div>
</header>

<style lang="scss">
  .dialog-header {
    border-bottom: 1px solid var(--border-color);
    padding: var(--space-l) var(--space-m);
    font-size: var(--text-sm);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--space-xs);

    .slot {
      display: flex;
      align-items: center;
    }

    .left {
      justify-content: flex-start;
    }

    .right {
      justify-content: flex-end;
    }

    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :global(.header-icon) {
      margin-right: var(--space-s);
    }
  }
</style>
