<script lang="ts">
  import Button from '../components/Button.svelte'
  import Icon from '../components/icons/Icon.svelte'
  import Layout from '../components/Layout.svelte'
  import WalletButton from '../components/WalletButton.svelte'
  import {ROUTES} from '../interfaces'
  import {router} from '../store'

  function loginWebAuthMobile() {
    router.push(ROUTES.WEBAUTH_LOGIN_MOBILE)
  }

  function loginWebAuthDesktop() {
    console.log('TODO Implement desktop')
  }

  function useOtherWallets() {
    router.push(ROUTES.OTHER_ANCHOR_USE)
  }

  function getWebAuth() {
    router.push(ROUTES.WEBAUTH_GET)
  }
</script>

<Layout>
  {#snippet content()}
    <div class="wrap">
      <ul class="wallets">
        <li>
          <WalletButton
            onclick={() => loginWebAuthMobile()}
            icon="qr-code"
            label="Mobile App"
            sublabel="Scan QR Code"
          />
        </li>

        <li>
          <WalletButton
            onclick={() => loginWebAuthDesktop()}
            icon="fingerprint"
            label="Browser wallet"
            sublabel="Authorize device"
          />
        </li>
      </ul>

      <div class="border-block new-account">
        <Button align="center" full onclick={() => getWebAuth()} appearance="secondary">
          {#snippet content()}
            <Icon name="web-auth" size="var(--space-2xl)" />
            <span class="btn-label">Create Account</span>
          {/snippet}
        </Button>
      </div>

      <div class="border-block tos">
        <span>
          By connecting, I accept XPR Network's <a
            href="https://xprnetwork.org/webauth-terms"
            target="_blank"
            class="link">Terms of Service</a
          >
        </span>
      </div>
    </div>
  {/snippet}

  {#snippet footer()}
    <Button align="between" full appearance="flat" onclick={() => useOtherWallets()}>
      {#snippet content()}
        <span>Connect with other wallets</span>
        <Icon name="arrow-right" />
      {/snippet}
    </Button>
  {/snippet}
</Layout>

<style lang="scss">
  @use '../../styles/mixins.scss';
  @use '../../styles/utils.scss';

  .wrap {
    box-sizing: border-box;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    display: grid;
    grid-template-rows: fit-content(60%) max-content auto;
  }

  .wallets {
    padding: var(--space-l);
    list-style: none;
    margin: 0;
    overflow: auto;
    box-sizing: border-box;

    @include mixins.sexy-scrollbars;

    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }

  .border-block {
    border-top: 1px solid var(--border-color);
  }

  .new-account {
    padding: var(--space-2xl) var(--space-l);
    box-sizing: border-box;
  }

  .tos {
    padding: var(--space-l);
    box-sizing: border-box;
    font-family: var(--text-font);
    font-size: var(--text-xxs);
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.3px;
    color: var(--text-secondary);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    a:hover {
      text-decoration: none;
    }
  }
</style>
