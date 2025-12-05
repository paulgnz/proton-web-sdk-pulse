<script lang="ts">
  import Layout from './components/Layout.svelte'
  import Modal from './components/Modal.svelte'
  import {active, router} from './store'
  import GetWebAuth from './views/GetWebAuth.svelte'
</script>

<svelte:head>
  <link href="https://fonts.cdnfonts.com/css/inter" rel="stylesheet" />
</svelte:head>

<Modal>
  {#snippet content()}
    {#if $active}
      <GetWebAuth />
      <!-- <Layout>
        {#snippet content()}
          <div style="height: 1000px; background: red;"></div>
        {/snippet}
        {#snippet footer()}
          Footer
        {/snippet}
      </Layout> -->
    {/if}
  {/snippet}
</Modal>
