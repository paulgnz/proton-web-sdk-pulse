<script lang="ts">
  let {code = '', label}: {code: string; label?: string} = $props()
</script>

<div class="qr-code">
  {#if label}
    <div class="qr-code__label">{label}</div>
  {/if}
  <div class="qr-code__wrap">
    <img class="qr-code__img" src={code} alt="QR Code" />
  </div>
</div>

<style lang="scss">
  .qr-code {
    padding: 0;
    box-sizing: border-box;
    font-family: var(--text-font);

    &__wrap {
      display: flex;
      place-content: center;
      background-color: #ffffff;
      border-radius: var(--space-l);
      padding: var(--space-m);
      width: 250px;
      height: 250px;
      box-sizing: border-box;
      margin-inline: auto;
    }

    &__label {
      margin-bottom: var(--space-l);
      font-size: var(--text-xs);
      text-align: center;
    }

    &__img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1/1;
    }
  }
</style>
