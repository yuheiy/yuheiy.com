import './yuhei-avator.js'
import whatInput from 'what-input'
import throttle from 'raf-throttle'
import { canUseWebComponents, shouldReduceMotion } from './util.js'

const isMouse = () =>
    whatInput.ask() === 'mouse' || whatInput.ask('intent') === 'mouse'
const isKeyboard = () => whatInput.ask() === 'keyboard'

if (canUseWebComponents && !shouldReduceMotion) {
    const anchorEl = document.querySelector(
        'body > footer a[title="yuheiy.com"]',
    )
    const avatorEl = anchorEl.querySelector('yuhei-avator')

    const checkActivity = () => {
        const isHovered = isMouse() && anchorEl.matches(':hover')
        const isKeyboardFocused =
            isKeyboard() && document.activeElement === anchorEl
        const shouldPlay = isHovered || isKeyboardFocused

        if (shouldPlay) {
            avatorEl.play()
        } else {
            avatorEl.stop()
        }
    }

    // mouse
    document.addEventListener('blur', checkActivity)
    document.addEventListener('mousemove', throttle(checkActivity))
    anchorEl.addEventListener('mouseenter', checkActivity)
    anchorEl.addEventListener('mouseleave', checkActivity)

    // keyboard
    anchorEl.addEventListener('focus', checkActivity)
    anchorEl.addEventListener('blur', checkActivity)
}

if (!canUseWebComponents) {
    const tmplEl = document.querySelector('#tmpl-yuhei-avator-fallback')

    document.querySelectorAll('yuhei-avator').forEach((originalEl) => {
        const replacementEl = document.importNode(
            tmplEl.content.firstElementChild,
            true,
        )
        ;[...originalEl.attributes].forEach(({ name, value }) => {
            replacementEl.setAttribute(name, value)
        })
        originalEl.replaceWith(replacementEl)
    })
}

console.log('Source: https://github.com/yuheiy/yuheiy.com')
