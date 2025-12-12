<script lang="ts">
  let {
    tabs,
    current = $bindable(''),
  }: {
    tabs: {
      name: string
      label: string
    }[]
    current?: string
  } = $props()

  function setTab(value: string) {
    current = value
  }
</script>

<div class="tabs">
  <div class="tabs-inner">
    {#each tabs as tab}
      <button class="tab" class:active={tab.name === current} onclick={() => setTab(tab.name)}
        >{tab.label}</button
      >
    {/each}
  </div>
</div>

<style lang="scss">
  @use '../../styles/mixins.scss';

  * {
    box-sizing: border-box;
  }

  .tabs {
    background-color: var(--tabs-background);
    padding: var(--space-xs);
    width: 100%;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    border-radius: var(--space-m);
    margin-inline: auto;

    &-inner {
      display: grid;
      grid-template-columns: repeat(var(--count), minmax(0, 1fr));
      position: relative;
      isolation: isolate;

      &:has(.tab:nth-child(1)) {
        --count: 1;
      }
      &:has(.tab:nth-child(2)) {
        --count: 2;
      }
      &:has(.tab:nth-child(3)) {
        --count: 3;
      }
      &:has(.tab:nth-child(4)) {
        --count: 4;
      }

      &:has(.tab:nth-child(1).active) {
        --active: 0;
      }

      &:has(.tab:nth-child(2).active) {
        --active: 1;
      }

      &:has(.tab:nth-child(3).active) {
        --active: 2;
      }

      &::after {
        content: '';
        position: absolute;
        inset: 0px;
        // transform: scale(0.94, 0.8);
        --width: calc((100% / var(--count)));
        width: var(--width);
        margin-left: calc(var(--active) * var(--width));
        transition: margin-left 300ms;
        background-color: var(--tabs-item-background);
        z-index: -1;
        border-radius: var(--space-s);
      }
    }
  }

  .tab {
    @include mixins.button-reset;

    padding: var(--space-s) 0;
    font-family: var(--text-font);
    font-size: var(--text-sm);
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.42px;

    &.active {
      color: #ffffff;
    }
  }
</style>
