import throttle from 'lodash-es/throttle'
import { hasTouch, canUseWebComponents, shouldReduceMotion } from './utils.js'

const init = () => {
    if (!canUseWebComponents) {
        return
    }

    if (shouldReduceMotion) {
        return
    }

    const anchorEl = document.querySelector('body > footer a[title="yuheiy.com"]')
    const avatorEl = anchorEl.querySelector('yuhei-avator')

    const update = () => {
        const isHovered = !hasTouch && anchorEl.matches(':hover')
        const isKeyboardFocused = anchorEl.matches('html[data-whatinput="keyboard"] :focus')
        const shouldPlay = isHovered || isKeyboardFocused
        if (shouldPlay) {
            avatorEl.play()
        } else {
            avatorEl.stop()
        }
    }

    // mouse
    document.addEventListener('blur', update)
    document.addEventListener('mousemove', throttle(update, 1000 / 5))
    anchorEl.addEventListener('mouseenter', update)
    anchorEl.addEventListener('mouseleave', update)

    // keyboard
    anchorEl.addEventListener('focus', update)
    anchorEl.addEventListener('blur', update)
}

export default init
