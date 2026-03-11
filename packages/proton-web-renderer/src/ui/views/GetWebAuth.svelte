<script lang="ts">
  import Button from '../components/Button.svelte'
  import GetApp from '../components/GetApp.svelte'
  import Icon from '../components/icons/Icon.svelte'
  import type {UIIcon} from '../components/icons/icons'
  import Layout from '../components/Layout.svelte'

  const benefits: {
    icon: UIIcon
    label: string
    description: string
  }[] = [
    {
      icon: 'user-key',
      label: 'Self-Custody Wallet',
      description: 'Your Keys. Your Crypto.',
    },
    {
      icon: 'fingerprint',
      label: 'Biometric Transaction Signing',
      description: 'Face ID, Touch ID, Yubikey',
    },
    {
      icon: 'globe',
      label: 'Multi-chain Network Support',
      description: 'XPR, ETH, XRPL, OP, METAL + more',
    },
    {
      icon: 'send',
      label: 'Fast, Free Transactions',
      description: 'via XPR Network',
    },
  ]
</script>

<Layout>
  {#snippet content()}
    <ul class="list">
      {#each benefits as item (item.label)}
        <li class="list__item">
          <Icon name={item.icon} class="list__icon" />
          <div>
            <div class="list__title">{item.label}</div>
            <div class="list__description">{item.description}</div>
          </div>
        </li>
      {/each}
    </ul>
    <div class="footer">
      <Button full align="between" href="https://xprnetwork.org/wallet" appearance="primary">
        {#snippet content()}
          <span class="btn-inner">
            <Icon name="web-auth" size="var(--space-xl)" />
            <span class="btn-label">Browser Wallet</span>
          </span>
          <Icon name="browser" />
        {/snippet}
      </Button>
      <GetApp class="footer-apps" />
    </div>
  {/snippet}
</Layout>

<style lang="scss">
  @use '../../styles/utils.scss';

  .list {
    list-style: none;
    padding: var(--space-2xl) var(--space-l);
    margin: 0;

    display: flex;
    flex-direction: column;
    gap: var(--space-s);

    :global(.list__icon) {
      opacity: 0.3;
    }

    &__description {
      opacity: 0.65;
    }

    &__item {
      display: grid;
      grid-template-columns: var(--space-2xl) auto;
      gap: var(--space-l);
      align-items: center;

      padding: var(--space-m) var(--space-l);
      border-radius: var(--space-l);
      border: 1px solid var(--list-border-color);
      background: var(--list-background);
    }

    &__title {
      font-size: var(--text-sm);
      font-weight: 600;
      line-height: 100%;
      letter-spacing: -0.7px;
    }

    &__description {
      margin-top: var(--space-s);
      font-size: var(--text-xs);
      font-weight: 600;
      line-height: 100%;
      letter-spacing: -0.6px;
    }
  }

  .footer {
    border-top: 1px solid var(--border-color);
    padding: var(--space-l);

    :global(.footer-apps) {
      margin-top: var(--space-l);
    }
  }
</style>
