export function addListener(el: Node, event: string, callback: () => void) {
  el.addEventListener(event, callback)

  return () => {
    el.removeEventListener(event, callback)
  }
}
