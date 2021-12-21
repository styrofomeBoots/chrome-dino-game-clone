import { setupGround, updateGround } from "./js/ground.js"
import { setupDino, updateDino, getDinoRect, setDinoLose } from "./js/dino.js"
import { setupCactus, updateCactus, getCactusRects } from "../js/cactus.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldEl = document.querySelector("[data-world]")
const scoreEl = document.querySelector("[data-score]")
const startScreenEl = document.querySelector("[data-start-screen]")

setPixelToWorldScale()
document.addEventListener("keydown", handleStart, { once: true })
window.addEventListener("resize", setPixelToWorldScale)

let lastTime
let speedScale
let score

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }
  worldEl.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldEl.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()
  startScreenEl.classList.add("hide")
  window.requestAnimationFrame(update)
}

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  lastTime = time

  updateGround(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  if (checkLose()) return handleLose()

  window.requestAnimationFrame(update)
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreEl.textContent = Math.floor(score)
}

function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some((rect) => isCollision(rect, dinoRect))
}

function handleLose() {
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenEl.classList.remove("hide")
  }, 100)
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}
