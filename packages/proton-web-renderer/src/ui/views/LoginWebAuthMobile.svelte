<script lang="ts">
  import GetApp from '../components/GetApp.svelte'
  import Layout from '../components/Layout.svelte'
  import QRCode from '../components/QRCode.svelte'
  import {qrRequestData} from '../store'

  // TODO REMOVE THE COMPONENT
  const code = $derived.by(() => $qrRequestData?.code)
  const link = $derived.by(() => $qrRequestData?.link)
</script>

<Layout>
  {#snippet content()}
    <div class="wrap">
      {#if code}
        <QRCode label="Scan QR Code" {code} />
      {/if}
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="footer">
      <div class="footer__label">Download the WebAuth Mobile App</div>
      <GetApp class="footer-apps" size="small" />
    </div>
  {/snippet}
</Layout>

<style lang="scss">
  .wrap {
    height: 100%;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: var(--space-2xl) var(--space-l);
  }

  .footer {
    border-top: 1px solid var(--border-color);
    padding: var(--space-l);
    text-align: center;

    &__label {
      font-size: var(--text-xs);

      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.36px;
      margin-bottom: var(--space-l);
    }

    :global(.footer-apps) {
      margin-inline: auto;
      margin-bottom: var(--space-l);
      max-width: 80%;
    }
  }
</style>
