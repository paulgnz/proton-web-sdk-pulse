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

export interface UIRenderer {
  login(): void
  sign(): void
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
