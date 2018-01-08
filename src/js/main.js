import 'what-input'
import './yuhei-avator.js'
import webComponentsFallback from './webcomponents-fallback.js'
import playYuheiAvator from './play-yuhei-avator.js'

document.documentElement.classList.remove('no-js')

webComponentsFallback()
playYuheiAvator()

console.log('Source: https://github.com/yuheiy/yuheiy.com')
