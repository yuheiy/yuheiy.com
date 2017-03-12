import {loaded} from 'document-promises'
import {wait} from '../util/promise'
import {$} from '../util/dom'

export default async () => {
  await loaded
  await wait(800)
  $('.author-photo').classList.add('is-shown')
}
