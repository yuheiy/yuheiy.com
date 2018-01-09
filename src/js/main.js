import 'what-input'
import './yuhei-avator.js'
import fallbackWebComponents from './webcomponents-fallback.js'
import initFooter from './footer.js'

document.documentElement.classList.remove('no-js')

fallbackWebComponents()
initFooter()

console.log('Source: https://github.com/yuheiy/yuheiy.com')
