# Proton Web Renderer - Browser Transport [![Package Version](https://img.shields.io/npm/v/@proton/web-renderer.svg?style=flat-square)](https://www.npmjs.com/package/@proton/web-renderer) ![License](https://img.shields.io/npm/l/@proton/web-renderer.svg?style=flat-square)

A UI layer for usage of [Proton Link](https://github.com/protonprotocol/proton-link) within a web browser environment.

## Basic usage

UI is required for Proton Browser Transport to show widget for user. In most examples we use the browser transport with no configuration, like so:

```ts
const transport = new ProtonBrowserTransport()
const link = new ProtonLink({transport})
```

The UI will be created internally with default configuration.

To use a customized Renderer it is required to create and instance of Renderer and pass it as argument to the transport
Parameters can be passed to the renders during construction as an object, allowing for the following optional changes:

```ts
const renderer = new WebRenderer({
  /** The identifier of ShadowDOM node, defaults to proton-web-ui */
  id: 'custom-renderer'

  /** The name of the theme to use. Default: dark. Possible values: dark, light or any name of the theme defined in themes options */
  theme: 'light'

  /** The definition of themes. It is possible to adjust the existing themes (light or dark) and define a new one */
  themes: {
    /* Theme name */
    light: {
      /** Parameters of the theme should be provided here. Check Theme customization section to see all possible options */
      base: {
        textColorBase: 'red'
      }
    }
  }
})

const transport = new ProtonBrowserTransport({
    ui: renderer
})
const link = new ProtonLink({transport})
```

## Theme customization

It is allowed to change color almost all elements of the widget. It is possible to define only some parameters, default values will be used for others.

```js
  appInfo: {
    // Application name. It will be displayed on wallet type selector screen. Optional.
    name: 'Taskly',
    // Application logo. It will be displayed on wallet type selector screen. Optional.
    logo: 'https://c2c54d36-0d4b-4f81-9fd2-004e7cb42dd1.mdnplay.dev/shared-assets/images/examples/plumeria.jpg',
    // If set to true, then logo will be displayed inside a circle. Optional
    logoRounded: true,
  },

  themes: {
    /* Theme name. It could be light, dark or any other name*/
    light: {
      // Base section 
      base: {
        // Base text color
        textColorBase: 'string',
        // Secondary text color (used for some labels)
        textColorSecondary: 'string',
        // Color of text links
        textColorLink: 'string',

        // Background color (or gradient) for the widget dialog
        bodyBackground: 'string',

        // Webkit scrollbar track color
        scrollBackground: 'string',
        
        // Webkit scrollbar thumb color
        scrollThumbBackground: 'string',

        // Background for logo image
        logoBackgroundColor: 'string',

        // Border color for spacers and other similar elements
        borderColor: 'string',

        // Countdown background color
        countdownBackground: 'string'
      }

      // Tabs. Used, for example, to switch between mobile and desktop authentication types
      tabs: {
        // Background color of tabs block
        background: 'string',
        // Background color of the active element
        backgroundActive: 'string',
        // Text color for active element
        textColorActive: 'string',
      }

      // List. Used on Get WebAuth view to style list of features
      list: {
        // Background color of the list item
        background: 'string',
        // Border color of the list item
        borderColor: 'string',
      }

      // Buttons. There are several types of button used in the UI. Each has parameters for configuration
      button: {
        // Icon button
        icon: {
          // Button is transparent by default. This option defines the background color on hover
          backgroundHover: 'string',
        }
        // Primary button
        primary: {
          // Defines a border color in default state
          borderColor: 'string',
          // Defines a border color on hover
          borderColorHover: 'string',
          // Defines a background color on button hover
          backgroundHover: 'string',
        }
        // Outlined button
        outlined: {
          // Defines a border color in default state
          borderColor: 'string',
          // Defines a border color on hover
          borderColorHover: 'string',
        }
        // Accent button
        accent: {
          // Defines a background color in default state
          background: 'string',
          // Defines a background color on button hover
          backgroundHover: 'string',
          // Defines a text color for the button
          textColor: 'string',
        }
        // Flat button
        flat: {
          // Defines a text color in default state
          textColor: 'string',
          // Defines a text color on button hover
          textColorHover: 'string',
        }
      }
    }
  }
```
## Developing

You need [node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation) installed.

Clone the repository and run `pnpm run build` to checkout all dependencies and build the project. See the [package.json](./package.json) for other useful commanfs. Before submitting a pull request make sure to run `pnpm run lint`.

## License

[MIT](./LICENSE.md)
