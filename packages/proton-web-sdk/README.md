# Proton Web SDK

Installation
```
npm i @proton/web-sdk
yarn add @proton/web-sdk
```

Usage
```javascript
import ProtonWebSDK from '@proton/web-sdk'

// Constants
const appIdentifier = 'taskly'

// Login
const { link, session } = await ProtonWebSDK({
    linkOptions: {
        /* RPC endpoints */
        endpoints: ['https://proton.greymass.com'],

        /* Recommended: false if first time connecting, true if trying to reconnect */
        restoreSession: false
    },
    transportOptions: {
        /* Recommended: Your proton account */
        requestAccount: appIdentifier,

        /* Optional: Display request success and error messages, Default true */
        requestStatus: true,
    },
    selectorOptions: {
        /* Optional: The list of enabled wallets. All wallets are enabled by default. Possible values: proton, webauth, anchor */
        enabledWalletTypes: ['proton', 'webauth', 'anchor']
        
        /* Optional: The name of the wallet to use. In this case the wallet selector step will be skipped. */
        walletType: 'proton'
    },
    /* Optional: Configuration of UI widget */
    uiOptions: {
      /* Optional: The name of the theme to use. Default: dark. Possible values: dark, light or any name of the theme defined in themes options */
      theme: 'light',
      /* Optional: The set of themes with options to adjust. It is possible to define some parameters for light or dark theme or define completely new theme with all parameters set */
      themes: {
        light: {
          base: {
            textColorBase: 'red',
            textColorLink: 'green',
          },
          button: {
            primary: {
              backgroundHover: 'red',
            },
          },
        },
        my: {
          base: {
            textColorBase: 'green',
            textColorLink: 'red',
          },
          button: {
            primary: {
              backgroundHover: 'blue',
            },
          },
        },
      },
    }
})

// Actor and permission
console.log(session.auth.actor) // e.g. "metal"
console.log(session.auth.permission) // e.g. "active"

// Send Transaction
const result = await session.transact({
    transaction: {
        actions: [{
            // Token contract for XUSDT
            account: 'xtokens',

            // Action name
            name: 'transfer',

            // Action parameters
            data: {
                from: session.auth.actor,
                to: 'token.burn',
                quantity: '0.000001 XUSDT',
                memo: 'Tip!'
            },
            authorization: [session.auth]
        }]
    },
}, { broadcast: true })
console.log('Transaction ID', result.processed.id)
      
// Logout
await link.removeSession(appIdentifier, session.auth)
link = undefined
session = undefined
```
