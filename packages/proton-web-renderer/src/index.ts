import {mount} from 'svelte'
import type {UIRenderer, UIRendererOptions} from './types'
import {active} from './ui/store'
import {addListener} from './utils'
import App from './ui/App.svelte'

export const defaultUIRendererOptions = {
  id: 'proton-web-ui',
}

export class WebRenderer implements UIRenderer {
  public element: Element | undefined
  public shadow: ShadowRoot | undefined
  public initialized = false
  readonly options: UIRendererOptions

  private offDOMContentLoaded: () => void = () => void 0
  private elementId: string = ''
  private app: any

  constructor(options: UIRendererOptions = defaultUIRendererOptions) {
    this.options = options
    if (typeof document !== 'undefined') {
      this.initialize()
    }
  }

  initialize() {
    // Prevent multiple initializations
    if (this.initialized) {
      return
    }
    const {options} = this
    // Create the dialog element and its shadow root
    this.element = document.createElement('div')
    this.elementId = options.id || defaultUIRendererOptions.id
    this.element.id = this.elementId

    this.shadow = this.element.attachShadow({mode: 'closed'})

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Document is ready, append element
      this.appendDialogElement()
    } else {
      // Add listener to append to body
      this.offDOMContentLoaded = addListener(document, 'DOMContentLoaded', () => {
        this.appendDialogElement()
      })
    }
    this.initialized = true
  }

  login(): void {
    throw new Error('Method not implemented.')
  }

  sign(): void {
    throw new Error('Method not implemented.')
  }

  show(): void {
    active.set(true)
  }

  close(): void {
    active.set(false)
  }

  private appendDialogElement() {
    const existing = document.getElementById(this.elementId)
    if (!this.element || !this.shadow) {
      throw new Error('The WebRenderer is not initialized. Call the initialize method first.')
    }
    if (!existing) {
      document.body.append(this.element)
      this.offDOMContentLoaded()
      this.app = mount(App, {
        target: this.shadow,
      })
    }
  }
}
