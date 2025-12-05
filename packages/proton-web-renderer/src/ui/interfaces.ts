import type {Writable} from 'svelte/store'

export type UITheme = 'light' | 'dark'

export type UIButtonColor = 'primary' | 'secondary' | 'accent'

/** The router for the sections of the UI */
export interface UIRouterState {
  path: string
  history: string[]
}

export interface UIRouter extends Writable<UIRouterState> {
  back: () => void
  push: (path: string) => void
}

/** The properties of the UI */
export interface UIProps {
  error?: Error
  title: string
  subtitle?: string
}
