import loadEntries from './load-entries.js'
import initCanvas from './creative-canvas.js'
import initTheme from './reverse-theme.js'

loadEntries(document.getElementById('js-entries-list'))
initCanvas(document.getElementById('js-canvas'))
initTheme(document.getElementById('js-semicolon'))

console.log('https://github.com/yuheiy/yuheiy.com')
