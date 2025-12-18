import type {Readable, Writable} from 'svelte/store'
import type {ROUTES, SUPPORTED_WALLETS} from './constants'

export type UITheme = 'light' | 'dark'

export type UIButtonAppearance = 'primary' | 'outlined' | 'secondary' | 'accent' | 'flat'

export type UIRouteValue = (typeof ROUTES)[keyof typeof ROUTES]

export type UIWalletType = (typeof SUPPORTED_WALLETS)[keyof typeof SUPPORTED_WALLETS]

/** The router for the sections of the UI */
export interface UIRouterState {
  path?: UIRouteValue
  history: UIRouteValue[]
}

export interface UIRouter extends Writable<UIRouterState> {
  back: () => void
  push: (_: UIRouteValue) => void
  onchange: Readable<{has_history: boolean}>
}

/** The properties of the UI */
export interface UIProps {
  error?: Error
  title: string // ??? not sure it is required
  title_hide_logo?: boolean
  subtitle?: string
  app_name?: string
  app_logo?: string
  app_logo_rounded?: string
  wallet_type?: UIWalletType
}

export interface UIWalletConfig {
  name: string
  label?: string
}

export interface UIErrorRequest {
  name: string
  description?: string
}

export interface UIAppContext {
  wallets: UIWalletConfig[]
  mainWallet?: UIWalletConfig['name']
}

export type UIWalletSelectResponse = {
  reject: (error: Error) => void
  resolve: (response: string) => void
}

export interface WritableWithReset<T> extends Writable<T | undefined> {
  reset: () => void
}

export interface UIQRData {
  code: string
  link: string
}
