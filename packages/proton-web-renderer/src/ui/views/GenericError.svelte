<script lang="ts">
  import ErrorDisplay from '../components/ErrorDisplay.svelte'
  import Layout from '../components/Layout.svelte'
  import type {UIError} from '../interfaces'

  let {name, description}: UIError = $props()
</script>

<Layout>
  {#snippet content()}
    <div class="wrap">
      <div class="core">
        <ErrorDisplay {name} {description} />
      </div>
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
  }
</style>
