<script lang="ts">
  import {active, router, app_props, backAction} from '../store'
  import Icon from './icons/Icon.svelte'
  import ButtonIcon from './ButtonIcon.svelte'
  import {type Unsubscriber} from 'svelte/store'
  import {onDestroy, onMount} from 'svelte'

  let {
    title,
    hideLogo = false,
    hideBack = false,
  }: {
    hideBack?: boolean
    hideLogo?: boolean
    title: string
  } = $props()

  let unsubscribe: Unsubscriber | undefined

  let showBack = $state(false)

  function close() {
    active.set(false)
  }

  function back() {
    router.back()

    if ($backAction) {
      $backAction()
      backAction.set(undefined)
    }
  }

  onMount(() => {
    unsubscribe = router.onchange.subscribe((value) => {
      showBack = !hideBack && (value.has_history || !!$backAction)
    })
  })

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })
</script>

<header class="dialog-header">
  <div class="slot left">
    {#if showBack}
      <ButtonIcon icon="arrow-left" onclick={() => back()}></ButtonIcon>
    {/if}
  </div>

  <div class="center">
    {#if !hideLogo}
      <Icon name="web-auth" class="header-icon" size="var(--space-xl)" />
    {/if}
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
