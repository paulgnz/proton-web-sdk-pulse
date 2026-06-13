<script lang="ts">
  import Layout from '../components/Layout.svelte'
  import WalletButton from '../components/WalletButton.svelte'
  import {SUPPORTED_WALLETS} from '../constants'
  import {type UIWalletType} from '../interfaces'
  import {demoMode, enabledWallets, walletSelect} from '../store'

  function selectWallet(walletType: UIWalletType) {
    if ($walletSelect) {
      $walletSelect.resolve(walletType)
      walletSelect.reset()
    }
    if ($demoMode) {
      $demoMode.selectWallet(walletType)
    }
  }
</script>

<Layout>
  {#snippet content()}
    <div class="wrap">
      <ul class="wallets">
        {#if $enabledWallets?.has(SUPPORTED_WALLETS.ANCHOR)}
          <li>
            <WalletButton
              onclick={() => selectWallet(SUPPORTED_WALLETS.ANCHOR)}
              icon="browser"
              label="Anchor"
              sublabel="Mobile or desktop"
            />
          </li>
        {/if}
        {#if $enabledWallets?.has(SUPPORTED_WALLETS.PULSEVM_DESKTOP)}
          <li>
            <WalletButton
              onclick={() => selectWallet(SUPPORTED_WALLETS.PULSEVM_DESKTOP)}
              icon="browser"
              label="PulseVM Wallet"
              sublabel="Desktop app · Touch ID"
            />
          </li>
        {/if}
      </ul>
    </div>
  {/snippet}
</Layout>

<style lang="scss">
  .wrap {
    box-sizing: border-box;
    padding: var(--space-2xl) var(--space-l);
  }
  .wallets {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
</style>
