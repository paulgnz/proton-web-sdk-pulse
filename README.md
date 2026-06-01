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

let link;
let session;

const login = async (restoreSession) => {
    const { link: localLink, session: localSession } = await ProtonWebSDK({
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
    })
​
    link = localLink
    session = localSession
}
​
const logout = async () => {
    if (link && session) {
      await link.removeSession(appIdentifier, session.auth, chainId);
    }
    session = undefined;
    link = undefined;
}
​
const transfer = async ({ to, amount }) => {
    if (!session) {
      throw new Error('No Session');
    }
​
    return await session.transact({
      actions: [{
        /**
         * The token contract, precision and symbol for tokens can be seen at protonscan.io/tokens
         */
​
        // Token contract
        account: "eosio.token",
​
        // Action name
        name: "transfer",
        
        // Action parameters
        data: {
          // Sender
          from: session.auth.actor,
​
          // Receiver
          to: to,
​
          // 4 is precision, XPR is symbol
          quantity: `${(+amount).toFixed(4)} XPR`,
​
          // Optional memo
          memo: ""
        },
        authorization: [session.auth]
      }]
    }, {
      broadcast: true
    })
}
​
// Restore on refresh
login(true)
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

 - **chainId** – type string – optional – an Id or a PSR chain name to which the SDK being connected to. If not specified – it is automatically fetched by the JsonRpcApi from the endpoint provided.

  - **usePulseVM** - type boolean - optional - a flag to mark network as using PulseVM. Enables another implementation of JsonRpcApi
​
 - **storage** – type LinkStorage – optional – if not specified, the new Storage is automatically created. In order to customize Storage, you should provide a custom LinkStorage interface with type specifications inside.
​
 - **storagePrefix** – type string – optional – a custom SDK storage prefix which is prepended to the name of localStorage keys. If not specified, automatically prepends ‘proton-storage’ string.
​
 - **restoreSession** – type Boolean – optional – if contains ```true``` value, prevents modal from popping up and makes SDK look for saved session value in the Storage. If not specified, automatically contains ```false``` value.
​
##### Example
If you add [https://rpc.api.testnet.metalx.com](https://rpc.api.testnet.metalx.com) as an endpoint, SDK will switch the scheme variable to the test mode, and all requests will be handled via Testnet.

```js
linkOptions: {
  endpoints: ['https://rpc.api.testnet.metalx.com']
}
```
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

  - **theme** - type string - optional - The name of the theme applied for the widget
​
 - **themes** – type Object – optional – object which can includes options to configure or defined theme of the widget.
Check the `proton-web-renderer` folder for more info.  

## Contributors
​
In order to install the **Proton Web SDK** and use it on your local environment for contribution or SDK source code improvement purposes, you should follow a few steps listed below:
​
 - Open the [Proton Web SDK github page](https://github.com/ProtonProtocol/ProtonWeb.git) and clone the repository by using 
``` 
git clone [https://github.com/ProtonProtocol/ProtonWeb.git]
``` 
## Select proper Node version
For now the project uses Node v18.19.1 for development. You can use NVM to switch to this version. The version is set in `.nvmrc` file. Run command `nvm use` in the root folder to activate it.

## Install
```
pnpm i
```
​
## Build

To build all apps and packages, run the following command:
```
pnpm run build
```
## Publish packages
```
pnpm run publish-packages
```

## Push tags to the repo
The changes are tagged automatically during `publish-packages` command run. But all these tags are created in the local repo.
It is required to push these tags to the repo:

To do it you can use the following command: `git push origin --tags`
Or the usual push of changes can be used with specific flag: `git push --follow-tags`

