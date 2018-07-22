import YuheiAvator from './yuhei-avator.mjs'

const isCustomElementsSupported = Boolean(window.customElements)
const isShadowDomSupported = Boolean(document.documentElement.attachShadow)
const canUseWebComponents = isCustomElementsSupported && isShadowDomSupported
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion)').matches

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
  const bgAvatorEl = document.querySelector('body > yuhei-avator')
  const authorAvatorEl = document.querySelector('body > footer yuhei-avator')

  const checkActivity = () => {
    const shouldPlayAuthor = authorAvatorEl.matches(':hover, :active')
    const shouldPlayBg = authorAvatorEl.matches(':active')

    if (shouldPlayAuthor) {
      authorAvatorEl.play()
    } else {
      authorAvatorEl.stop()
    }

    if (shouldPlayBg) {
      bgAvatorEl.play()
    } else {
      bgAvatorEl.stop()
    }
  }

  const loop = () => {
    requestAnimationFrame(loop)
    checkActivity()
  }
  requestAnimationFrame(loop)
}

console.log('Source: https://github.com/yuheiy/yuheiy.com')
