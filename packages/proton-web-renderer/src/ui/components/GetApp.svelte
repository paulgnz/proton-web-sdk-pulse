<script lang="ts">
  import type {ClassValue} from 'svelte/elements'

  let {
    class: className,
  }: {
    class?: ClassValue
  } = $props()
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
      height="32"
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
      height="32"
    />
  </a>
</div>

<style lang="scss">
  .links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-l);

    a {
      font-size: 0;
    }

    img {
      object-fit: contain;
    }
  }
</style>
