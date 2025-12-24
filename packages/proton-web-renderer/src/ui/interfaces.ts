import type {Readable, Writable} from 'svelte/store'
import type {ROUTES, SUPPORTED_WALLETS} from './constants'

export type UITheme = 'light' | 'dark' | string

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

export interface UIThemeOptions {
  base?: {
    textColorBase?: string
    textColorSecondary?: string
    textColorLink?: string

    bodyBackground?: string

    borderColor?: string
  }

  tabs?: {
    background?: string
    backgroundActive?: string
    textColorActive?: string
  }

  list?: {
    background?: string
    borderColor?: string
  }

  button?: {
    icon?: {
      backgroundHover?: string
    }
    primary?: {
      borderColor?: string
      borderColorHover?: string
      backgroundHover?: string
    }
    outlined?: {
      borderColor?: string
      borderColorHover?: string
    }
    accent?: {
      background?: string
      backgroundHover?: string
      textColor?: string
    }
    flat?: {
      textColor?: string
      textColorHover?: string
    }
  }
}

/** The properties of the UI */
export interface UIProps {
  theme?: UITheme
  themes?: Record<UITheme, UIThemeOptions>
}

export interface UIWalletConfig {
  name: string
  label?: string
}

export interface UIError {
  name: string
  description?: string
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

export interface UISignData {
  timeout?: number
  deviceName?: string
}
