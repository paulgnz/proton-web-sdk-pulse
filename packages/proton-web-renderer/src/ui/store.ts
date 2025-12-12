import {derived, writable} from 'svelte/store'
import {
  ROUTES,
  type UIAppContext,
  type UIErrorRequest,
  type UIProps,
  type UIRouter,
  type UIRouterState,
  type UITheme,
} from './interfaces'

export const appContext = writable<UIAppContext | undefined>()

/** Whether or not the interface is active in the browser */
export const active = writable<boolean>(false)

export const theme = writable<UITheme>('dark')

export const errorRequest = writable<UIErrorRequest | undefined>(undefined)

const defaultUIProps: UIProps = {
  title: 'Get web auth',
  subtitle: 'Status Message',
}

export const app_props = writable<UIProps>(defaultUIProps)

const defaultUIRouterState: UIRouterState = {
  path: ROUTES.WEBAUTH_CONNECT,
  // path: ROUTES.OTHER_ANCHOR_SIGN,
  history: [],
}

const initRouter = (): UIRouter => {
  const state = writable<UIRouterState>(defaultUIRouterState)
  const onchange = derived(state, (value) => ({has_history: value.history.length > 0}))
  return {
    // Method to go one back in history
    back: () =>
      state.update((current: UIRouterState) => ({
        ...current,
        path: current.history[current.history.length - 1],
        history: current.history.slice(0, -1),
      })),
    // Push a new path on to history
    push: (path) =>
      state.update((current) => ({
        ...current,
        path,
        history: [...current.history, current.path],
      })),
    set: state.set,
    subscribe: state.subscribe,
    update: state.update,
    onchange,
  }
}

export const router = initRouter()

// Reset data in all stores
export function resetState() {
  active.set(false)

  router.set({...defaultUIRouterState})
  app_props.set({...defaultUIProps})

  // prompt.reset()

  // cancelablePromises.set([])
  // transactContext.set(undefined)

  appContext.set(undefined)
  errorRequest.set(undefined)
  // loginPromise.set(undefined)
  // loginResponse.set({...defaultLoginResponse})

  // accountCreationContext.set(undefined)
  // accountCreationPromise.set(undefined)
  // accountCreationResponse.set({...defaultAccountCreationResponse})

  // errorDetails.set(undefined)
  // backAction.set(undefined)
  // transitionDirection.set(undefined)
}
