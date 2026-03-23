import ArrowLeft from './ArrowLeft.svelte'
import ArrowRight from './ArrowRight.svelte'
import Browser from './Browser.svelte'
import QRCode from './QRCode.svelte'
import FingerPrint from './FingerPrint.svelte'
import XMark from './XMark.svelte'
import WebAuth from './WebAuth.svelte'
import Send from './Send.svelte'
import Globe from './Globe.svelte'
import UserKey from './UserKey.svelte'

const icons = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  browser: Browser,
  'qr-code': QRCode,
  fingerprint: FingerPrint,
  xmark: XMark,
  'web-auth': WebAuth,
  send: Send,
  globe: Globe,
  'user-key': UserKey,
}

export type UIIcon = keyof typeof icons
export default icons
