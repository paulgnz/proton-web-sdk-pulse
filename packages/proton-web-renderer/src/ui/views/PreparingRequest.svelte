<script lang="ts">
  import ErrorRequest from '../components/ErrorRequest.svelte'
  import Layout from '../components/Layout.svelte'
</script>

<Layout>
  {#snippet content()}
    <div class="wrap">
      <div class="core">
        <ErrorRequest name="Preparing request..." />
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
