import throttle from 'raf-throttle'
import YuheiAvator from './yuhei-avator.js'
import { canUseWebComponents, shouldReduceMotion } from './util.js'

if (canUseWebComponents) {
  customElements.define('yuhei-avator', YuheiAvator)
} else {
  const tmplEl = document.querySelector('#tmpl-yuhei-avator-fallback')
  const customAttrs = {
    label: 'aria-label',
  }

  document.querySelectorAll('yuhei-avator').forEach((originalEl) => {
    const replacementEl = document.importNode(
      tmplEl.content.firstElementChild,
      true,
    )
    ;[...originalEl.attributes].forEach(({ name, value }) => {
      if (customAttrs[name]) {
        replacementEl.setAttribute(customAttrs[name], value)
      } else {
        replacementEl.setAttribute(name, value)
      }
    })
    originalEl.replaceWith(replacementEl)
  })
}

if (canUseWebComponents && !shouldReduceMotion) {
  const anchorEl = document.querySelector('body > footer a[title="yuheiy.com"]')
  const avatorEl = anchorEl.querySelector('yuhei-avator')

  const checkActivity = () => {
    const isMouse = window.matchMedia('(pointer: fine)').matches
    const shouldPlay =
      (isMouse && anchorEl.matches(':hover')) || anchorEl.matches(':focus')

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

console.log('Source: https://github.com/yuheiy/yuheiy.com')
