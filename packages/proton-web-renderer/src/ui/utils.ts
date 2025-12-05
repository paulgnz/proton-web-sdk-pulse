export function self(fn) {
  return function (...args) {
    const event = /** @type {Event} */ args[0]
    // @ts-expect-error this is unknown
    if (event.target === this) {
      // @ts-expect-error this is unknown
      fn?.apply(this, args)
    }
  }
}

export function once(fn) {
  let ran = false

  return function (...args) {
    if (ran) return
    ran = true

    // @ts-expect-error this is unknown
    return fn?.apply(this, args)
  }
}
