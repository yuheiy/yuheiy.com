import 'what-input'
import './yuhei-avator.js'
import webComponentsFallback from './webcomponents-fallback.js'
import PageFooter from './PageFooter.js'

document.documentElement.classList.remove('no-js')

webComponentsFallback()
PageFooter()

console.log('Source: https://github.com/yuheiy/yuheiy.com')
