<script lang="ts">
  import {onDestroy, onMount} from 'svelte'
  import Header from './components/Header.svelte'
  import Modal from './components/Modal.svelte'
  import {type UITheme} from './interfaces'
  import {active, app_props, closeAction, error, router, theme, walletSelect} from './store'
  import ConnectWebAuth from './views/ConnectWebAuth.svelte'
  import GetWebAuth from './views/GetWebAuth.svelte'
  import UseAnchorWallet from './views/UseAnchorWallet.svelte'
  import SignRequest from './views/SignRequest.svelte'
  import RequestWithQRCode from './views/RequestWithQRCode.svelte'
  import type {Unsubscriber} from 'svelte/store'
  import {ROUTES} from './constants'
  import GenericError from './views/GenericError.svelte'

  let title = $state('')
  let hideLogo = $state(false)
  let hideBackSource = $state(false)

  let hideBack = $derived(!!$error || hideBackSource)

  const isOtherRegExp = /^other\-/
  const isSignRegExp = /\-sign$/
  const isSignManualRegExp = /\-manual\-sign$/
  let unsubscribeProps: Unsubscriber | undefined
  let unsubscribeRouter: Unsubscriber | undefined
  let unsubscribeActive: Unsubscriber | undefined

  onMount(() => {
    unsubscribeProps = app_props.subscribe((value) => {
      if (value.theme) {
        setTheme(value.theme)
      }
    })
    unsubscribeRouter = router.subscribe((current) => {
      if (current.path) {
        if (isOtherRegExp.test(current.path)) {
          hideLogo = true
        } else {
          hideLogo = false
        }

        if (isSignManualRegExp.test(current.path)) {
          title = 'Sign manually'
          hideBackSource = true
        } else if (isSignRegExp.test(current.path)) {
          title = 'Sign request'
          hideBackSource = true
        } else {
          if (current.path === ROUTES.PREPARING_REQUEST) {
            title = 'Pending...'
            hideBackSource = true
            hideLogo = true
          } else if (current.path === ROUTES.OTHER_ANCHOR_USE) {
            title = 'Anchor wallet'
          } else if (current.path === ROUTES.OTHER_ANCHOR_SIGN) {
            title = 'Anchor wallet'
          } else if (current.path === ROUTES.WEBAUTH_LOGIN_MOBILE) {
            title = 'Scan with WebAuth App'
          } else {
            title = 'Connect WebAuth'
          }
        }
      } else {
        hideLogo = false
        hideBackSource = false
      }
    })

    unsubscribeActive = active.subscribe((value) => {
      if (!value) {
        hideBackSource = false

        if ($walletSelect) {
          $walletSelect.reject(new Error('no wallet selected'))
          walletSelect.reset()
        }
        if ($closeAction) {
          $closeAction()
          closeAction.set(undefined)
        }
      }
    })
  })

  function setTheme(themeValue: UITheme) {
    theme.set(themeValue)
  }

  // function sign() {
  //   router.push(ROUTES.WEBAUTH_SIGN)
  // }

  // function signAnchor() {
  //   router.push(ROUTES.OTHER_ANCHOR_SIGN)
  // }

  onDestroy(() => {
    unsubscribeProps?.()
    unsubscribeRouter?.()
    unsubscribeActive?.()
  })
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Modal>
  {#snippet content()}
    <div style="position: fixed; top: 0; left: 0; z-index: 1000">
      <button onclick={() => setTheme('dark')}>Dark</button>
      <button onclick={() => setTheme('light')}>Light</button>
      <div style="display: inline-block; width: 30px"></div>

      <!-- <button onclick={() => sign()}>Sign with WebAuth</button> -->
      <!-- <button onclick={() => signAnchor()}>Sign with Anchor</button> -->
    </div>

    <Header {title} {hideLogo} {hideBack}></Header>

    {#if $active}
      {#if $error}
        <GenericError name={$error.name} description={$error.description} />
      {:else if $router.path === ROUTES.WEBAUTH_GET}
        <GetWebAuth />
      {:else if $router.path === ROUTES.OTHER_ANCHOR_USE}
        <UseAnchorWallet />
      {:else if $router.path === ROUTES.WEBAUTH_LOGIN_MOBILE}
        <RequestWithQRCode />
      {:else if $router.path === ROUTES.WEBAUTH_CONNECT}
        <ConnectWebAuth />
      {:else if $router.path === ROUTES.WEBAUTH_SIGN}
        <SignRequest />
      {:else if $router.path === ROUTES.WEBAUTH_SIGN_MANUAL}
        <RequestWithQRCode />
      {:else if $router.path === ROUTES.OTHER_ANCHOR_SIGN}
        <SignRequest walletType="anchor" />
      {:else if $router.path === ROUTES.OTHER_ANCHOR_SIGN_MANUAL}
        <RequestWithQRCode walletType="anchor" />
      {:else if $router.path === ROUTES.PREPARING_REQUEST}
        <GenericError name="Preparing request..." />
      {/if}
    {/if}
  {/snippet}
</Modal>
