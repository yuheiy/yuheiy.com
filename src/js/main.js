'use strict'

import loadEntries from './load-entries'
import initCanvas from './creative-canvas'
import initTheme from './reverse-theme'

loadEntries(document.getElementById('js-entries-list'))
initCanvas(document.getElementById('js-canvas'))
initTheme(document.getElementById('js-semicolon'))

console.log('https://github.com/yuheiy/yuheiy.com')
