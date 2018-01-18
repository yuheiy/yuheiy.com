import 'what-input'
import './yuhei-avator.js'
import throttle from 'lodash-es/throttle'
import { hasTouch, canUseWebComponents, shouldReduceMotion } from './utils.js'

document.documentElement.classList.remove('no-js')

if (canUseWebComponents && !shouldReduceMotion) {
    const anchorEl = document.querySelector('body > footer a[title="yuheiy.com"]')
    const avatorEl = anchorEl.querySelector('yuhei-avator')

    const checkActivity = () => {
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
    document.addEventListener('blur', checkActivity)
    document.addEventListener('mousemove', throttle(checkActivity, 1000 / 5))
    anchorEl.addEventListener('mouseenter', checkActivity)
    anchorEl.addEventListener('mouseleave', checkActivity)

    // keyboard
    anchorEl.addEventListener('focus', checkActivity)
    anchorEl.addEventListener('blur', checkActivity)
}

if (!canUseWebComponents) {
    const tmplEl = document.querySelector('#tmpl-yuhei-avator-fallback')

    document.querySelectorAll('yuhei-avator').forEach((originalEl) => {
        const replacementEl = document.importNode(tmplEl.content.firstElementChild, true)
        ;[...originalEl.attributes].forEach(({ name, value }) => {
            replacementEl.setAttribute(name, value)
        })
        originalEl.replaceWith(replacementEl)
    })
}

console.log('Source: https://github.com/yuheiy/yuheiy.com')
