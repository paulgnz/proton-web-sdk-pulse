import type {UIQRData, UIWalletType} from './ui/interfaces'

export type UIPercentageString = `${number}%`
export type UIPixelsString = `${number}px`

export type UISpace =
  | 'var(--space-xs)'
  | 'var(--space-s)'
  | 'var(--space-m)'
  | 'var(--space-l)'
  | 'var(--space-xl)'
  | 'var(--space-2xl)'

export interface UIRendererOptions {
  id?: string
  logging?: boolean
}

export interface UIRequestPayload {
  data: UIQRData
  wallet_type: UIWalletType | string
  onClose?: () => void
  onBack?: () => void
}

export type UILoginPayload = UIRequestPayload
export type UISignManuallyPayload = UIRequestPayload

export interface UIRenderer {
  selectWallet(): Promise<string>
  login(_: UILoginPayload): void
  sign(): void
  sign_manually(_: UISignManuallyPayload): void
  show(): void
  close(): void
  destroy(): void
  showLoading(): void
}

export interface DialogArgs {
  title: string | HTMLElement
  manual?: HTMLElement
  subtitle?: string | HTMLElement
  type?: string
  content?: Record<string, any>
  action?: {text: string; callback: () => void}
  showFootnote?: boolean
  hideLogo?: boolean
  hideBackButton?: boolean
}
