import type {Readable, Writable} from 'svelte/store'

export type UITheme = 'light' | 'dark'

export type UIButtonAppearance = 'primary' | 'outlined' | 'secondary' | 'accent' | 'flat'

export const enum ROUTES {
  WEBAUTH_GET = 'webauth-get',
  WEBAUTH_LOGIN_MOBILE = 'webauth-login-mobile',
  WEBAUTH_CONNECT = 'webauth-connect',
  WEBAUTH_SIGN = 'webauth-sign',
  WEBAUTH_SIGN_MANUAL = 'webauth-manual-sign',
  OTHER_ANCHOR_USE = 'other-anchor-use',
  OTHER_ANCHOR_SIGN = 'other-anchor-sign',
  OTHER_ANCHOR_SIGN_MANUAL = 'other-anchor-manual-sign',
}

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]

/** The router for the sections of the UI */
export interface UIRouterState {
  path: RouteValue
  history: RouteValue[]
}

export interface UIRouter extends Writable<UIRouterState> {
  back: () => void
  push: (path: RouteValue) => void
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
