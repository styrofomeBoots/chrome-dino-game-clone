export function getCustomProperty(el, prop) {
  return parseFloat(getComputedStyle(el).getPropertyValue(prop))
}

export function setCustomProperty(el, prop, value) {
  el.style.setProperty(prop, value)
}

export function incrementCustomProperty(el, prop, inc) {
  setCustomProperty(el, prop, getCustomProperty(el, prop) + inc)
}
