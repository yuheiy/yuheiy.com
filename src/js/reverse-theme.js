'use strict'

const STORAGE_KEY_NAME = 'color-theme'
const STATE_CLASS_NAME = 'is-reversed'

const getCurrentTheme = () => localStorage.getItem(STORAGE_KEY_NAME) ||
  'default'

const setTheme = theme => {
  const rootClassList = document.documentElement.classList

  switch (theme) {
    case 'default':
      rootClassList.remove(STATE_CLASS_NAME)
      break

    case 'reversed':
      rootClassList.add(STATE_CLASS_NAME)
      break
  }

  localStorage.setItem(STORAGE_KEY_NAME, theme)
}

const reverseTheme = () => {
  const currentTheme = getCurrentTheme()

  switch (currentTheme) {
    case 'default':
      setTheme('reversed')
      break

    case 'reversed':
      setTheme('default')
      break
  }
}

const handleDoubleTap = (target, callback) => {
  const TAP_INTERVAL_DELAY = 400
  let tapCount = 0
  let tapTimeout = null

  const onTouchStart = (...args) => {
    if (++tapCount === 2) {
      callback.apply(target, args)
      clearTimeout(tapTimeout)
      tapCount = 0
    } else {
      clearTimeout(tapTimeout)
      tapTimeout = setTimeout(() => tapCount = 0, TAP_INTERVAL_DELAY)
    }
  }

  target.addEventListener('touchstart', onTouchStart, false)
}

const initTheme = element => {
  const setCurrentTheme = () => {
    const currentTheme = getCurrentTheme()
    setTheme(currentTheme)
  }

  setCurrentTheme()
  window.addEventListener('storage', setCurrentTheme)

  element.addEventListener('dblclick', reverseTheme, false)
  handleDoubleTap(element, event => {
    event.preventDefault()
    reverseTheme()
  })
}

export default initTheme
