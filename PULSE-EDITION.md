# proton-web-sdk — Pulse Edition

A fork of [XPRNetwork/proton-web-sdk](https://github.com/XPRNetwork/proton-web-sdk)
that adds the **native PulseVM desktop wallet** as a first-class wallet type,
alongside the existing WebAuth / Anchor options.

- **WebAuth / Metal X** continue to sign over ESR via the `achain` scheme
  (mobile QR + browser authorize) — unchanged from upstream.
- **PulseVM Wallet (Desktop)** is new: it signs over the `pulsevm://` URL scheme
  (packed-trx + callback), driving the native macOS PulseVM wallet, which signs
  on-device with Touch ID / Secure Enclave.

Upstream remains the `upstream` git remote so changes can be pulled in.

## What changed vs upstream

| File | Change |
|------|--------|
| `packages/proton-web-renderer/src/ui/constants.ts` | Added `SUPPORTED_WALLETS.PULSEVM_DESKTOP = 'pulsevm'` to the selector. |
| `packages/proton-web-renderer/src/ui/views/ConnectWebAuth.svelte` | Added a **PulseVM Wallet** option to the selector modal. |
| `packages/proton-web-sdk/src/links/pulsevmDesktop.ts` | New `pulsevm://` transport + `transact()` session (mirrors `LinkSession`). |
| `packages/proton-web-sdk/src/connect.ts` | Routes `walletType === 'pulsevm'` to the desktop transport (bypasses ESR/ProtonLink). |
| `packages/proton-web-sdk/src/index.ts` | Exports `handlePulseVMCallback`, `loginPulseVMDesktop`, `PulseDesktopSession`. |

## Usage

```ts
import ConnectWallet, { handlePulseVMCallback } from '@proton/web-sdk'

// On the callback page (the wallet redirects back here), resolve the request:
handlePulseVMCallback()

const { session } = await ConnectWallet({
  linkOptions: {
    endpoints: ['https://rpc.a-chain-testnet.protonnz.com'],
    chainId: '0d6f033e887f…',
    usePulseVM: true,
  },
  transportOptions: { requestAccount: '' },
  selectorOptions: {
    appName: 'My PulseVM dapp',
    // Show WebAuth (achain) AND the native desktop wallet:
    enabledWalletTypes: ['proton', 'webauth', 'anchor', 'pulsevm'],
  },
})

// Selecting "PulseVM Wallet" opens the native macOS app over pulsevm://.
const res = await session.transact({
  actions: [{
    account: 'pulse.token',
    name: 'transfer',
    authorization: [{ actor: session.auth.actor, permission: session.auth.permission }],
    data: { from: session.auth.actor, to: 'pulse', quantity: '0.0001 XPR', memo: 'hello' },
  }],
})
console.log(res.transactionId)
```

## Notes & limits

- The desktop transport serializes the `transfer` action; for arbitrary actions,
  pack with [pulsevm-js](https://github.com/MetalBlockchain/pulsevm-js) and pass the
  packed transaction. (Same limit as the lightweight
  [pulse-web-sdk](https://github.com/paulgnz/pulse-web-sdk).)
- The native desktop wallet must be installed and launched once so macOS
  registers the `pulsevm://` scheme.
- This is the "powerhouse" SDK (full selector, WebAuth + desktop). For a tiny
  zero-dependency desktop-only connector, use **pulse-web-sdk**.
