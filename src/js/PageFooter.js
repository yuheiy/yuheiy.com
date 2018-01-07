import throttle from 'lodash-es/throttle'
import { hasTouch, canUseWebComponents, shouldReduceMotion } from './utils.js'

const init = () => {
    if (!canUseWebComponents) {
        return
    }

    if (shouldReduceMotion) {
        return
    }

    const authorImageEl = document.querySelector('.PageFooter-authorImage')
    const authorLinkEl = document.querySelector('.PageFooter-authorLink')

    const update = () => {
        const isHovered = !hasTouch && authorLinkEl.matches(':hover')
        const isKeyboardFocused = authorLinkEl.matches('html[data-whatinput="keyboard"] :focus')
        const shouldPlay = isHovered || isKeyboardFocused
        if (shouldPlay) {
            authorImageEl.play()
        } else {
            authorImageEl.stop()
        }
    }

    // mouse
    document.addEventListener('blur', update)
    document.addEventListener('mousemove', throttle(update, 1000 / 5))
    authorLinkEl.addEventListener('mouseenter', update)
    authorLinkEl.addEventListener('mouseleave', update)

    // keyboard
    authorLinkEl.addEventListener('focus', update)
    authorLinkEl.addEventListener('blur', update)
}

export default init
