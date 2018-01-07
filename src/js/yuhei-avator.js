import random from 'lodash-es/random'
import range from 'lodash-es/range'
import { withComponent } from 'skatejs/dist/esnext/index.js'
import { canUseWebComponents } from './utils.js'

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

const ANIMATION_REFRESH_RATE = 1000 / 15

class YuheiAvator extends withComponent() {
    constructor() {
        super()
        this._isPlaying = false
        this._timerId = null
        this.updateLines = this.updateLines.bind(this)

        this.updateLines()
    }

    updateLines() {
        this.state = { lines: createLines() }
    }

    play() {
        if (this._isPlaying) {
            return
        }

        this.updateLines()
        this._timerId = setInterval(this.updateLines, ANIMATION_REFRESH_RATE)
        this._isPlaying = true
    }

    stop() {
        if (!this._isPlaying) {
            return
        }

        clearTimeout(this._timerId)
        this._isPlaying = false
    }

    render({ state: { lines } }) {
        return `
            <style>
                :host {
                    contain: content;
                    display: inline-block;
                }

                svg {
                    width: 100%;
                    height: 100%;
                    vertical-align: bottom;
                }

                rect {
                    fill: var(--yuhei-avator__color-bg, var(--color-bg));
                }

                polyline {
                    fill: none;
                    stroke: var(--yuhei-avator__color-fg, var(--color-fg));
                    stroke-width: ${STAGE_WIDTH / 64};
                    stroke-linecap: square;
                }
            </style>

            <svg viewBox="0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}" preserveAspectRatio="xMidYMid slice" role="img">
                <rect width="${STAGE_WIDTH}" height="${STAGE_HEIGHT}"></rect>
                ${lines
                    .map((line) => `<polyline points="${line.toPointsAttrVal()}"></polyline>`)
                    .join('')}
            </svg>
        `
    }
}

if (canUseWebComponents) {
    customElements.define('yuhei-avator', YuheiAvator)
}
