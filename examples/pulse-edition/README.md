# Pulse Edition demo

Shows the full proton-web-sdk selector (WebAuth / Anchor over `achain`) **plus**
the native **PulseVM Wallet (Desktop)** option over `pulsevm://`.

## Run

```bash
cd ../..        # repo root
pnpm install && pnpm build          # builds packages/proton-web-sdk/lib/*.bundle.js
cd examples/pulse-edition && ./serve.sh
```

Open http://localhost:8088, click **Connect Wallet**, choose **PulseVM Wallet** in
the modal — it opens the native macOS wallet (Touch ID). The wallet must be
installed and launched once so macOS registers the `pulsevm://` scheme.

> Defaults to the A-Chain testnet. WebAuth/Anchor paths are unchanged from upstream.
