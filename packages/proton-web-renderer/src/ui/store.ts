import {derived, writable} from 'svelte/store'
import type {
  UIError,
  UIProps,
  UIQRData,
  UIRouter,
  UIRouterState,
  UIRouteValue,
  UISignData,
  UITheme,
  UIWalletSelectResponse,
  WritableWithReset,
} from './interfaces'

// TODO Review this
const defaultUIProps: UIProps = {
  title: 'Get web auth',
  subtitle: 'Status Message',
}

export const app_props = writable<UIProps>(defaultUIProps)

/** Whether or not the interface is active in the browser */
export const active = writable<boolean>(false)

export const theme = writable<UITheme>('dark')

export const closeAction = writable<(() => void) | undefined>(undefined)
export const backAction = writable<(() => void) | undefined>(undefined)
export const manualAction = writable<(() => void) | undefined>(undefined)

export const error = writable<UIError | undefined>(undefined)
export const recoverError = writable<UIError | undefined>(undefined)

const defaultUIRouterState: UIRouterState = {
  path: undefined,
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
      state.update((current) => {
        let history: UIRouteValue[] = []
        if (current.path) {
          history = current.history
          if (current.path !== path) {
            history = [...current.history, current.path]
          }
        }

        return {
          ...current,
          path,
          history,
        }
      }),
    set: state.set,
    subscribe: state.subscribe,
    update: state.update,
    onchange,
  }
}

export const router = initRouter()

export function initWritableWithReset<T>(): WritableWithReset<T> {
  const {set, subscribe, update} = writable<T | undefined>(undefined)
  return {
    reset: () => set(undefined),
    set,
    subscribe,
    update,
  }
}

export const walletSelect = initWritableWithReset<UIWalletSelectResponse>()

export const qrRequestData = initWritableWithReset<UIQRData>()

export const signRequestData = initWritableWithReset<UISignData>()

// Reset data in all stores
export function resetState() {
  active.set(false)

  router.set({...defaultUIRouterState})
  app_props.set({...defaultUIProps})

  // prompt.reset()

  // cancelablePromises.set([])
  // transactContext.set(undefined)

  error.set(undefined)
  walletSelect.reset()
  backAction.set(undefined)
  closeAction.set(undefined)
  manualAction.set(undefined)
  signRequestData.reset()
  recoverError.set(undefined)

  // loginPromise.set(undefined)
  // loginResponse.set({...defaultLoginResponse})

  // accountCreationContext.set(undefined)
  // accountCreationPromise.set(undefined)
  // accountCreationResponse.set({...defaultAccountCreationResponse})

  // errorDetails.set(undefined)
  // backAction.set(undefined)
  // transitionDirection.set(undefined)
}
