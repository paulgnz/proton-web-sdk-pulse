<script lang="ts">
  import {appInfo} from '../store'

  const appName = $derived.by(() => $appInfo.name)
  const appLogo = $derived.by(() => $appInfo.logo)
  const rounded = $derived.by(() => ($appInfo.logoRounded ? 'rounded' : undefined))
  const hasInfo = $derived(!!appName || !!appLogo)
</script>

{#if hasInfo}
  <div class="app-info">
    {#if appLogo}
      <div>
        <img src={appLogo} alt={appName} class="app-info__logo" data-rounded={rounded} />
      </div>
    {/if}

    {#if appName}
      <div class="app-info__name">{appName}</div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .app-info {
    margin-top: var(--space-l);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-s);

    &__name {
      font-size: var(--text-base);
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.8px;
    }

    &__logo {
      object-fit: cover;
      width: 64px;
      height: 64px;

      &[data-rounded] {
        border-radius: 100%;
      }
    }
  }
</style>
