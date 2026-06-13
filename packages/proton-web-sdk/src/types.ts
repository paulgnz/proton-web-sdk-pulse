import type {Link, LinkOptions, LinkSession, LinkStorage, LoginResult} from '@proton/link'
import type {BrowserTransportOptions} from '@proton/browser-transport'
import type {ProtonWebLink} from './links/protonWeb'
import type {UIRendererOptions} from '@proton/web-renderer'

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type UIOptions = UIRendererOptions

export interface SelectorOptions {
  walletType?: string
  enabledWalletTypes?: string[]
}

export type LocalLinkOptions = PartialBy<LinkOptions, 'transport' | 'chains' | 'scheme'> & {
  endpoints: string[]
  storage?: LinkStorage
  storagePrefix?: string
  restoreSession?: boolean
  testUrl?: string
  /** Pulse Edition: relay base URL for the native PulseVM desktop wallet, so it
   *  returns the result server-to-server (no second browser tab). e.g.
   *  "https://relay.pulsevm.dev". Omit to use the browser-callback fallback. */
  pulsevmRelay?: string
}

export interface ConnectWalletArgs {
  linkOptions: LocalLinkOptions
  transportOptions?: BrowserTransportOptions
  selectorOptions?: SelectorOptions
  uiOptions?: UIOptions
}

export interface ConnectWalletRet {
  session?: LinkSession
  link?: ProtonWebLink | Link
  loginResult?: LoginResult
  error?: any
}

export interface WalletItem {
  key: string
  value: string
}

export interface LoginOptions {
  selectorOptions: SelectorOptions
  linkOptions: LocalLinkOptions
  transportOptions: BrowserTransportOptions
}
