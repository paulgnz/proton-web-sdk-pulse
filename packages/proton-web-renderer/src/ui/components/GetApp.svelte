<script lang="ts">
  import type {ClassValue} from 'svelte/elements'

  let {
    size = 'medium',
    class: className,
  }: {
    class?: ClassValue
    size?: 'small' | 'medium'
  } = $props()

  const imgSize = $derived.by(() => (size === 'medium' ? 120 : 95))
  // Optical compensation for Google Play icon
  const googleSize = $derived(Math.floor(imgSize / 0.93))
</script>

<div class={['links', className]}>
  <a
    href="https://apps.apple.com/us/app/webauth-com/id1594500069"
    id="iOS"
    target="_blank"
    rel="noreferrer"
  >
    <img
      src="https://cdn.xprnetwork.org/images/webauth/badges/app_store_badge/public"
      alt="Download on the App Store"
      width={imgSize}
    />
  </a>
  <a
    href="https://play.google.com/store/apps/details?id=com.metallicus.webauth"
    id="Android"
    target="_blank"
    rel="noreferrer"
  >
    <img
      src="https://cdn.xprnetwork.org/images/webauth/badges/google_play_badge/public"
      alt="Get it on Google Play"
      width={googleSize}
    />
  </a>
</div>

<style lang="scss">
  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      font-size: 0;
    }

    img {
      object-fit: contain;
    }
  }
</style>
