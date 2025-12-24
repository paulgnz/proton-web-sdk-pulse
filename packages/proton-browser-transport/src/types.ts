import type {UIRenderer} from '@proton/web-renderer'

export const SkipToManual = Symbol()

export interface BrowserTransportOptions {
  /** Whether to display request success and error messages, defaults to true */
  requestStatus?: boolean
  /** Requesting account of the dapp (optional) */
  requestAccount?: string
  /** Wallet name e.g. proton, anchor, etc */
  walletType?: string
  /** Local storage prefix, defaults to `proton-link`. */
  storagePrefix?: string

  ui?: UIRenderer
}
