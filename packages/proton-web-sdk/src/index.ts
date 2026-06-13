import {ConnectWallet} from './connect'

export type {ProtonWebLink} from './links/protonWeb'
export type {Link, LinkSession, TransactResult} from '@proton/link'

//Allowing Type Definitions to be used by other modules
export * from './types'

export {setUITheme, runUIDemo} from './connect'

// Pulse Edition: native PulseVM desktop-wallet helpers. Call handlePulseVMCallback()
// once on page load so the wallet's pulsevm:// redirect resolves the pending login/sign.
export {handlePulseVMCallback, loginPulseVMDesktop} from './links/pulsevmDesktop'
export type {PulseDesktopSession} from './links/pulsevmDesktop'

export default ConnectWallet
