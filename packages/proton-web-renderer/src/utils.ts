export function addListener(el: Node, event: string, callback: () => void) {
  el.addEventListener(event, callback)

  return () => {
    el.removeEventListener(event, callback)
  }
}

function toKebabCase(str: string) {
  let kebabCase = ''
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (char.toUpperCase() === char && char.toLowerCase() !== char) {
      if (i > 0) {
        kebabCase += '-'
      }
      kebabCase += char.toLowerCase()
    } else if (char === ' ' || char === '_' || char === '-') {
      kebabCase += '-'
    } else {
      kebabCase += char
    }
  }
  return kebabCase
}

export function flattenObject(obj: Record<string, any>, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix !== '' ? `${prefix}-` : undefined
    const key = `${pre ?? ''}${toKebabCase(k)}`
    if (typeof obj[k] === 'object' && obj[k] !== null && Object.keys(obj[k]).length > 0) {
      Object.assign(acc, flattenObject(obj[k], key))
    } else {
      acc[key] = obj[k]
    }
    return acc
  }, {})
}

export function toCssVars(obj: Record<string, string>, prefix = '') {
  prefix = prefix !== '' ? `${prefix}-` : ''
  return Object.entries(obj).map(([key, value]) => {
    return `--${prefix}${key}: ${value};`
  })
}
