# Proton Web SDK

# Proton Web SDK
## Overview
**Proton** is a cryptocurrency public blockchain designed for consumer applications and seamless P2P payments which aims at maximizing payment acceptance speed by using identity verification mechanism.  
  
**Proton Web SDK** – is one of the packages that gives developers the ability to create web applications to interact with Proton wallets. This SDK will facilitate the process of communication between the web application and the Proton wallet. This package allows to send requests to the wallet for user authentication and signatures.
​
## Installation
​​
**npm** 
```
npm i @proton/web-sdk
``` 
**yarn** 
```
yarn add @proton/web-sdk
``` 
## Usage
### Import:

ES6

```js
import ProtonWebSDK from '@proton/web-sdk'
```  

CommonJS

```js
const ProtonWebSDK = require('@proton/web-sdk')
```

### Initialization:

```js 
import ProtonWebSDK from '@proton/web-sdk';

const { link, session } = await ProtonWebSDK({
  linkOptions: {
    endpoints,
    chainId,
    restoreSession,
  },
  transportOptions: {
    requestAccount: appIdentifier
  },
  uiOptions: {
    theme: 'light',
    themes: {
      dark: {
        base: {
          textColorBase: 'black',
          textColorSecondary: '#6B727F',
          textColorLink: '#752EEB',
          bodyBackground: '#F4F7FA'
        },
        button: {
          primary: {
            backgroundHover: 'black',
          },
        },
      },
    },
  }
});
​​
// Restore on refresh
login(true);

// Actor and permission
console.log(session.auth.actor); // e.g. "metal"
console.log(session.auth.permission); // e.g. "active"

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
## Options
​
The ```ProtonWebSDK``` Class takes three main types of option objects:
 - ```linkOptions```
 - ```transportOptions```  
 - ```selectorOptions```
 - ```uiOptions```
​
### Link Options
A required object which includes all options for communication customization.

**linkOptions:**
 - **endpoints** – type array – required – an array of endpoints that an SDK will address to.
​
    > Only one endpoint is required. If more are provided, the SDK will use them as failover targets.

    > The SDK is able to automatically differentiate Mainnet and Testnet from the url

 - **usePulseVM** - type boolean - optional - a flag to mark network as using PulseVM. Enables another implementation of JsonRpcApi


 - **chainId** – type string – optional – an Id or a PSR chain name to which the SDK being connected to. If not specified – it is automatically fetched by the JsonRpcApi from the endpoint provided.
​
 - **storage** – type LinkStorage – optional – if not specified, the new Storage is automatically created. In order to customize Storage, you should provide a custom LinkStorage interface with type specifications inside.
​
 - **storagePrefix** – type string – optional – a custom SDK storage prefix which is prepended to the name of localStorage keys. If not specified, automatically prepends ‘proton-storage’ string.
​
 - **restoreSession** – type Boolean – optional – if contains ```true``` value, prevents modal from popping up and makes SDK look for saved session value in the Storage. If not specified, automatically contains ```false``` value.
​
##### Example
If you add [https://api-dev.protonchain.com/v1/chain/info](https://api-dev.protonchain.com/v1/chain/info) as an endpoint, SDK will switch the scheme variable to the test mode, and all requests will be handled via Testnet.
​
### Transport Options
An object which contains all needed data for the client communication. If not specified an empty object will be provided for the SDK.

**transportOptions:**

 - **requestAccount** – type string – optional – this field is used for identifying which account is requesting the client transaction. If no value provided, it will be replaced with the “Unknown Requestor” in the transaction request.
​
    > Typically same as appName
​​
### Selector Options

An optional object which includes options for the wallet selection.

**selectorOptions:**

  - **enabledWalletTypes** - type stringp[] - optional - The list of enabled wallets. All wallets are enabled by default. Possible values: proton, webauth, anchor.
​
 - **walletType** – type string – optional – The name of the wallet to use. In this case the wallet selector step will be skipped.

### UI Options

An object which includes style options for the wallet selection. If not specified the basic styling for the modal window will be provided.

**uiOptions:**
  - **appInfo** - optional object with application info. It will be displayed on wallet type selector screen. It has following parameters:
    - **name** - type string - optional - application name. 
    - **logo** - type string - optional - application logo.
    - **logoRounded** - type boolean - optional - if set to true, then logo will be displayed inside a circle.

  - **theme** - type string - optional - The name of the theme applied for the widget
​
 - **themes** – type Object – optional – object which can includes options to configure or defined theme of the widget.
Check the `@proton/web-renderer` package for more info.  

## Methods
By default the package exports the Proton Web SDK class. But there are several extra functions exported:

  - `setUITheme` - the function allows to switch themes for the widget. It accepts the name of the theme as argument. By default there are 2 themes: `light` and `dark`. But it is possible to pass any name of the theme defined in the `uiOptions` `themes` object.

    ```js
    setUITheme('light');
    ```
  - `runUIDemo` - the function starts a demo of the widget without the real authentication or sign process started. This could be useful to work on new theme implementation or theme adjustments. It is possible to see all available views of the app and see how they look in different themes.
  It accepts object with `uiOptions` as an optional argument to provide theme and other parameters to demo.
    ```js
    runUIDemo();
    ```

## Breaking changes
After the upgrade to version 5+ some adjustments for the code required.
`selectorOptions` object changed. 

No more `appName`, `appLogo`. 
These options now moved to `uiOptions` -> `appInfo`.
Old:
```
appName: 'Taskly',
appLogo: 'https://...'
```
New:
```
uiOptions: {
  appInfo: {
    name: 'Taskly',
    logo: 'https://...'
  }
}
```

`customStyleOptions` converted into `uiOption`. Check `@proton/web-renderer` for more info.

`isLogoRound` boolean option from `customStyleOptions` converted into `logoRounded` boolean option in `appInfo`.

