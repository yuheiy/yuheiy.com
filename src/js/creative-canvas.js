'use strict'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const times = (n, iteratee) => {
  for (const i of Array(n).keys()) {
    iteratee()
  }
}

const createFPSControlledLoop = (callback, fps = 60) => {
  let startTime = null
  let lastFrame = -1

  const loop = () => {
    requestAnimationFrame(loop)

    if (!startTime) {
      startTime = performance.now()
    }

    const currentTime = performance.now()
    const elapsedTime = currentTime - startTime
    const currentFrame = Math.floor(elapsedTime / (1000 / fps))

    if (lastFrame !== currentFrame) {
      callback()
      lastFrame = currentFrame
    }
  }

  requestAnimationFrame(loop)
}

const draw = (ctx, width, height) => {
  ctx.clearRect(0, 0, width, height)
  ctx.lineWidth = 8
  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-color').trim()
  ctx.strokeStyle = textColor
  ctx.beginPath()

  times(3, () => {
    let x = - ctx.lineWidth / 2
    let y = height / 2
    ctx.moveTo(x, y)

    while (x < width) {
      x += random(ctx.lineWidth, ctx.lineWidth * 4)
      y += random(- ctx.lineWidth * 4, ctx.lineWidth * 4)
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()
}

const initCanvas = canvas => {
  const context = canvas.getContext('2d')
  const setCanvasSize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  const FPS = 8

  setCanvasSize()
  createFPSControlledLoop(
    () => draw(context, canvas.width, canvas.height),
    FPS
  )

  window.addEventListener('resize', setCanvasSize, false)
}

export default initCanvas
