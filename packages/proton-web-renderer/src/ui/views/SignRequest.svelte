<script lang="ts">
  import Countdown from '../components/Countdown.svelte'
  import Error from '../components/ErrorRequest.svelte'
  import Layout from '../components/Layout.svelte'
  import {ROUTES} from '../interfaces'
  import {errorRequest, router} from '../store'

  let {
    walletType = 'webauth',
  }: {
    walletType?: 'webauth' | 'anchor'
  } = $props()

  function signManually(e: MouseEvent) {
    e.preventDefault()

    if (walletType === 'anchor') {
      router.push(ROUTES.OTHER_ANCHOR_SIGN_MANUAL)
    } else {
      router.push(ROUTES.WEBAUTH_SIGN_MANUAL)
    }
  }

  function timeout() {
    errorRequest.set({
      name: 'Request Timed Out',
      description: 'Please resubmit your transaction.',
    })
  }
</script>

<Layout>
  {#snippet content()}
    <div class="wrap">
      <div class="core">
        {#if $errorRequest}
          <Error name={$errorRequest.name} description={$errorRequest.description} />
        {:else}
          <div class="core__label">
            {#if walletType === 'anchor'}
              Please open Anchor Wallet to <br /> review the transaction
            {:else}
              Please open WebAuth Wallet to <br /> review the transaction
            {/if}
          </div>
          <Countdown end={new Date(Date.now() + 30_000).toISOString()} ontimeout={timeout} />
        {/if}
      </div>
    </div>
  {/snippet}
  {#snippet footer()}
    <div class="footer">
      <!-- svelte-ignore a11y_invalid_attribute -->
      Optional: <a href="#" onclick={signManually} class="link">Sign manually using QR code</a>
    </div>
  {/snippet}
</Layout>

<style lang="scss">
  @use '../../styles/mixins.scss';
  @use '../../styles/utils.scss';

  .wrap {
    height: 100%;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .core {
    box-sizing: border-box;
    padding: calc(var(--space-l) * 2) var(--space-2xl);

    &__label {
      margin-bottom: var(--space-l);
      text-align: center;
      font-size: var(--text-sm);
      line-height: normal;
      letter-spacing: -0.42px;
    }
  }

  .footer {
    border-top: 1px solid var(--border-color);
    box-sizing: border-box;
    padding: var(--space-2xl);
    text-align: center;
    font-size: var(--text-xs);
    line-height: normal;
    letter-spacing: -0.36px;
  }
</style>
