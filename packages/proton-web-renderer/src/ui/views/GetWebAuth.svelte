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
      icon: 'storage',
      label: 'Wallet that you control',
      description: 'Secure Crypto Storage',
    },
    {
      icon: 'send',
      label: 'Send, receive, swap, stake',
      description: 'Secure Crypto Storage',
    },
    {
      icon: 'trade',
      label: 'Verify all transactions',
      description: 'Secure Crypto Storage',
    },
    {
      icon: 'bars',
      label: 'DeFi',
      description: 'Secure Crypto Storage',
    },
  ]
</script>

<Layout>
  {#snippet content()}
    <ul class="list">
      {#each benefits as item}
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
      <GetApp class="footer-apps" />

      <Button full align="between" href="https://xprnetwork.org/wallet" appearance="primary">
        {#snippet content()}
          <span class="btn-inner">
            <Icon name="web-auth" size="var(--space-xl)" />
            <span class="btn-label">WebAuth.com</span>
          </span>
          <Icon name="browser" />
        {/snippet}
      </Button>
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

    :global(.list__icon),
    &__description {
      opacity: 0.3;
    }

    &__item {
      display: grid;
      grid-template-columns: var(--space-2xl) auto;
      gap: var(--space-l);
      align-items: center;

      padding: var(--space-m) var(--space-l);
      border-radius: var(--space-l);
      border: 1px solid var(--list-border);
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
      margin-bottom: var(--space-l);
    }
  }
</style>
