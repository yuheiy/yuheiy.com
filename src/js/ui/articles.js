import {contentLoaded} from 'document-promises'
import {fetchXML} from '../util/fetch'
import {$, $$} from '../util/dom'

const convertFeedToArticles = (xmlDocument, author) => {
  let entries = $$('entry', xmlDocument)
  if (author) {
    entries = entries.filter(entry => $('author name', entry).textContent === author)
  }

  return entries.map(entry => ({
    title: $('title', entry).textContent,
    link: $('link', entry).getAttribute('href'),
    date: $('published', entry).textContent,
  }))
}

// 参考: https://github.com/hail2u/hail2u.net/blob/ce9decd6362d03ab7acf65afc8dfd056e3392330/src/js/reldate.js
let _now
const toRelativeDate = to => {
  to = Date.parse(to)
  if (!Number.isInteger(to)) return

  if (!Number.isInteger(_now)) _now = Date.now()

  let diff = (_now - to) / 1000
  if (!Number.isInteger(Math.trunc(diff)) || diff < 0) return

  if (Math.floor(diff) === 0) return 'たった今'
  if (diff < 60) return `${Math.trunc(diff)}秒前`

  diff = diff / 60
  if (diff < 60) return `${Math.trunc(diff)}分前`

  diff = diff / 60
  if (diff < 24) return `${Math.trunc(diff)}時間前`

  diff = diff / 24
  if (diff < 30) return `${Math.trunc(diff)}日前`

  diff = diff / 30
  if (diff < 12) return `${Math.trunc(diff)}ヶ月前`

  diff = diff / 12
  return `${Math.trunc(diff)}年前`
}

export default async () => {
  const Vue = (await import('vue')).default

  await contentLoaded

  for (const el of $$('.js-articles')) {
    new Vue({
      el,
      template: '#template-articles',
      data: {
        articles: [],
        hasError: false,
        isCompleted: false,
      },
      async mounted() {
        try {
          const xmlDocument = await fetchXML(el.dataset.input)
          const articles = convertFeedToArticles(xmlDocument, el.dataset.author).slice(0, 5)
          this.articles = articles
        } catch (err) {
          this.hasError = true
          console.error(err)
        }

        this.isCompleted = true
      },
      methods: {
        toRelativeDate,
      },
    })
  }
}
