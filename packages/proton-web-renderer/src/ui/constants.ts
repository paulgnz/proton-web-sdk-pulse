export const enum AUTH_TYPES {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

export const enum ROUTES {
  WEBAUTH_GET = 'webauth-get',
  WEBAUTH_LOGIN_MOBILE = 'webauth-login-mobile',
  WEBAUTH_CONNECT = 'webauth-connect',
  WEBAUTH_SIGN = 'webauth-sign',
  WEBAUTH_SIGN_MANUAL = 'webauth-manual-sign',
  OTHER_ANCHOR_USE = 'other-anchor-use',
  OTHER_ANCHOR_SIGN = 'other-anchor-sign',
  OTHER_ANCHOR_SIGN_MANUAL = 'other-anchor-manual-sign',
  PREPARING_REQUEST = 'preparing-request',
}

export const enum SUPPORTED_WALLETS {
  WEBAUTH_MOBILE = 'proton',
  WEBAUTH_WEB = 'webauth',
  ANCHOR = 'anchor',
}

export const ENABLED_WALLETS = [
  SUPPORTED_WALLETS.WEBAUTH_MOBILE,
  SUPPORTED_WALLETS.WEBAUTH_WEB,
  SUPPORTED_WALLETS.ANCHOR,
]

export const DEMO_IMG =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmYiIHZlcnNpb249IjEuMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNMTAgNXY1SDB2MTBoMTBWMTBoMTBWMEgxMHoiLz48L3N2Zz4='
