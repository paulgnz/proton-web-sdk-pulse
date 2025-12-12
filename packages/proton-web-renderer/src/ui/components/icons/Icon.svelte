<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import type {UIPercentageString, UIPixelsString, UISpace} from '../../../types'
  import icons from './icons'
  import type {UIIcon} from './icons'

  let {
    name,
    size = 'var(--space-l)',
    color = 'currentColor',
    class: className,
  }: {
    name: UIIcon
    size?: UISpace | UIPercentageString | UIPixelsString
    color?: string
    class?: ClassValue
  } = $props()

  const isImg = $derived.by(() => {
    return /^data\:image/.test(icons[name])
  })
</script>

<span
  style="width: {size}; display: inline-grid; place-content: center; color: {color}"
  class={className}
>
  {#if isImg}
    <img src={icons[name]} alt={name} />
  {:else}
    {@html icons[name]}
  {/if}
</span>

<style lang="scss">
  span {
    :global(svg),
    :global(img) {
      width: 100%;
      height: 100%;
    }
  }
</style>
