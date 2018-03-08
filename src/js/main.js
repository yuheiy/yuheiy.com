import './yuhei-avator.js'
import whatInput from 'what-input'
import throttle from 'raf-throttle'
import { canUseWebComponents, shouldReduceMotion } from './util.js'

if (canUseWebComponents && !shouldReduceMotion) {
  const anchorEl = document.querySelector('body > footer a[title="yuheiy.com"]')
  const avatorEl = anchorEl.querySelector('yuhei-avator')
  let isAfterInitial = false

  const checkActivity = async () => {
    if (isAfterInitial) {
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        })
      })
      isAfterInitial = false
    }

    const inputed = whatInput.ask()
    const intented = whatInput.ask('intent')

    if (intented === 'initial') {
      isAfterInitial = true
      return
    }

    const isHovered = intented === 'mouse' && anchorEl.matches(':hover')
    const isKeyboardFocused =
      inputed === 'keyboard' && document.activeElement === anchorEl
    const shouldPlay = isHovered || isKeyboardFocused

    if (shouldPlay) {
      avatorEl.play()
    } else {
      avatorEl.stop()
    }
  }

  document.addEventListener('blur', checkActivity)
  document.addEventListener('mousemove', throttle(checkActivity))
  anchorEl.addEventListener('mouseenter', checkActivity)
  anchorEl.addEventListener('mouseleave', checkActivity)
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
