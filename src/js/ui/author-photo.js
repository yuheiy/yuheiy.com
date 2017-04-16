import {wait} from '../util/promise'
import {$} from '../util/dom'

const loadImage = (imagePath) => new Promise(resolve => {
  const loader = new Image()
  loader.onload = resolve
  setTimeout(resolve, 3000)
  loader.src = imagePath
})

export default async () => {
  const el = $('.author-photo')
  const imgEl = $('img', el)
  const {src} = imgEl.dataset
  await Promise.all([
    loadImage(src),
    wait(400),
  ])
  imgEl.src = src
  el.classList.add('is-visible')
}
