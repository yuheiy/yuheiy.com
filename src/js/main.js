import 'what-input'
import './yuhei-avator.js'
import { parsed as documentParsed } from 'document-promises'
import webComponentsFallback from './webcomponents-fallback.js'
import PageFooter from './PageFooter.js'

document.documentElement.classList.remove('no-js')
;(async () => {
    await documentParsed
    webComponentsFallback()
    PageFooter()
})()

console.log('Source: https://github.com/yuheiy/yuheiy.com')
