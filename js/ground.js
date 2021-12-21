import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const groundEls = document.querySelectorAll("[data-ground]")

export function setupGround() {
  setCustomProperty(groundEls[0], "--left", 0)
  setCustomProperty(groundEls[1], "--left", 300)
}

export function updateGround(delta, speedScale) {
  for (const el of groundEls) {
    incrementCustomProperty(el, "--left", delta * SPEED * speedScale * -1)
    if (getCustomProperty(el, "--left") <= -300) {
      incrementCustomProperty(el, "--left", 600)
    }
  }
}
