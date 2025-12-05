import {writable} from 'svelte/store'
import type {UIProps, UIRouter, UIRouterState, UITheme} from './interfaces'

/** Whether or not the interface is active in the browser */
export const active = writable<boolean>(false)

export const theme = writable<UITheme>('dark')

const defaultUIProps: UIProps = {
  title: 'Get web auth',
  subtitle: 'Status Message',
}

export const props = writable<UIProps>(defaultUIProps)

const defaultUIRouterState: UIRouterState = {
  path: '',
  history: [],
}

const initRouter = (): UIRouter => {
  const {set, subscribe, update} = writable<UIRouterState>(defaultUIRouterState)
  return {
    // Method to go one back in history
    back: () =>
      update((current: UIRouterState) => ({
        ...current,
        path: current.history[current.history.length - 1],
        history: current.history.slice(0, -1),
      })),
    // Push a new path on to history
    push: (path: string) =>
      update((current) => ({
        ...current,
        path,
        history: [...current.history, current.path],
      })),
    set,
    subscribe,
    update,
  }
}

export const router = initRouter()

// Reset data in all stores
export function resetState() {
  active.set(false)

  router.set({...defaultUIRouterState})
  props.set({...defaultUIProps})

  // prompt.reset()

  // cancelablePromises.set([])
  // transactContext.set(undefined)

  // loginContext.set(undefined)
  // loginPromise.set(undefined)
  // loginResponse.set({...defaultLoginResponse})

  // accountCreationContext.set(undefined)
  // accountCreationPromise.set(undefined)
  // accountCreationResponse.set({...defaultAccountCreationResponse})

  // errorDetails.set(undefined)
  // backAction.set(undefined)
  // transitionDirection.set(undefined)
}
