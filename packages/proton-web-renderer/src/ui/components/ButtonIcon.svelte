<script lang="ts">
  import Icon from './icons/Icon.svelte'
  import type {UIIcon} from './icons/icons'
  import type {MouseEventHandler} from 'svelte/elements'
  let {
    onclick,
    icon,
    label,
  }: {
    label?: string
    onclick?: MouseEventHandler<HTMLButtonElement> | null | undefined
    icon: UIIcon
  } = $props()
</script>

<button type="button" {onclick}>
  <Icon name={icon} class="btn-icon" />
  <span class="label visually-hidden">{label ?? icon}</span>
</button>

<style lang="scss">
  @use '../../styles/mixins.scss';

  button {
    @include mixins.button-reset;

    --button-size: var(--space-2xl, 24px);

    border-radius: 100%;
    width: var(--button-size);
    height: var(--button-size);
    display: flex;
    place-content: center;

    :global(.btn-icon) {
      transition: transform 80ms ease;
      transform-origin: center;
      flex-shrink: 0;
    }

    &:active {
      :global(.btn-icon) {
        transform: scale(95%);
      }
    }

    @include mixins.hover {
      background-color: var(--button-icon-background-hover);
    }
  }
</style>
