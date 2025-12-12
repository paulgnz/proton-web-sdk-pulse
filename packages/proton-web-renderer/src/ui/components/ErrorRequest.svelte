<script lang="ts">
  import type {UIErrorRequest} from '../interfaces'

  let {name, description}: UIErrorRequest = $props()
</script>

<div class="error">
  <div class="error__name">{name}</div>
  {#if description}
    <div class="error__description">{description}</div>
  {/if}
</div>

<style lang="scss">
  .error {
    &__name {
      font-size: var(--text-2xl);
      font-style: normal;
      font-weight: 600;
      line-height: 120%; /* 28.8px */
      letter-spacing: -1.2px;
      text-align: center;
    }

    &__description {
      margin-top: var(--space-l);
      text-align: center;
      font-size: var(--text-base);
      font-style: normal;
      font-weight: 400;
      line-height: 120%; /* 19.2px */
      letter-spacing: -0.8px;
    }
  }
</style>
