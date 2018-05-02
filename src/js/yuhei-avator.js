import random from 'lodash-es/random'
import range from 'lodash-es/range'
import { canUseWebComponents } from './util.js'

const ANIMATION_REFRESH_RATE = 1000 / 15

const STAGE_WIDTH = 1024
const STAGE_HEIGHT = 1024

const minMoveX = STAGE_WIDTH / 100
const maxMoveX = STAGE_WIDTH / 10
const minMoveY = STAGE_HEIGHT / 10 * -1
const maxMoveY = STAGE_HEIGHT / 10

const createLine = () => {
  const startX = 0
  const startY = STAGE_HEIGHT / 2
  const points = [[startX, startY]]
  let currentX = startX
  let currentY = startY

  while (currentX < STAGE_WIDTH) {
    currentX += random(minMoveX, maxMoveX)
    currentY += random(minMoveY, maxMoveY)
    points.push([currentX, currentY])
  }

  return {
    points,
    toPointsAttrVal: () => points.map((point) => point.join(',')).join(' '),
  }
}

const createLines = () => range(3).map(createLine)

export default class YuheiAvator extends HTMLElement {
  constructor() {
    super()
    this._isPlaying = false
    this._timerId = null
    this._render = this._render.bind(this)

    this.attachShadow({ mode: 'open' })
    this._render()
  }

  play() {
    if (this._isPlaying) {
      return
    }

    this._render()
    this._timerId = setInterval(this._render, ANIMATION_REFRESH_RATE)
    this._isPlaying = true
  }

  stop() {
    if (!this._isPlaying) {
      return
    }

    clearTimeout(this._timerId)
    this._isPlaying = false
  }

  _render() {
    const lines = createLines()

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          all: initial;
          contain: content;
          display: inline-block;
        }

        #stage {
          width: 100%;
          height: 100%;
          vertical-align: bottom;
        }

        #background {
          fill: var(--yuhei-avator__color-bg, var(--color-bg, white));
        }

        .line {
          fill: none;
          stroke: var(--yuhei-avator__color-fg, var(--color-fg, black));
          stroke-width: ${STAGE_WIDTH / 64};
          stroke-linecap: square;
        }
      </style>

      <svg id="stage" viewBox="0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}" preserveAspectRatio="xMidYMid slice" role="img">
        <rect id="background" width="${STAGE_WIDTH}" height="${STAGE_HEIGHT}"></rect>
        ${lines
          .map(
            (line) =>
              `<polyline class="line" points="${line.toPointsAttrVal()}"></polyline>`,
          )
          .join('')}
      </svg>
    `
  }
}