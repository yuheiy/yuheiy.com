const fetchXML = url => new Promise(resolve => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.addEventListener('load', () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      resolve(xhr.responseXML)
    }
  })
  xhr.send()
})

const clampText = (text, length = 140) => {
  if (text.length <= length) {
    return text
  }
  return `${text.slice(0, length)}...`
}

const generateTemplate = (title, href, summary) =>
  `<section>
<h1><a href="${href}">${title}</a></h1>
<p>${clampText(summary)}</p>
</section>`
    .replace(/\n/g, '')

const setInnerHTML = (containerElement, innerHTML) => {
  while (containerElement.hasChildNodes()) {
    containerElement.removeChild(containerElement.firstChild)
  }
  containerElement.insertAdjacentHTML('beforeend', innerHTML)
}

const loadEntries = containerElement => {
  // const YUHEI_BLOG_FEED = 'http://yuheiy.hatenablog.com/feed'
  const YUHEI_BLOG_FEED = 'https://yuheiy-blog-feed.appspot-preview.com/'
  const RYDEN_BLOG_FEED = 'https://ryden-inc.github.io/rookies/atom.xml'

  Promise.all([
    YUHEI_BLOG_FEED,
    RYDEN_BLOG_FEED
  ].map(fetchXML))
    .then(docs => docs.map(doc => [...doc.querySelectorAll('entry')]))
    .then(([
      yuheiEntries,
      rydenEntries
    ]) => {
      const entries = rydenEntries
        .filter(entry => entry.querySelector('author name').textContent === '安田 祐平')
        .concat(yuheiEntries)
        .map(entry => {
          const title = entry.querySelector('title').textContent
          const href = entry.querySelector('link').getAttribute('href')
          const published = entry.querySelector('published').textContent
          const summary = entry.querySelector('summary').textContent
            .replace(/<.*?>/g, '').trim()

          return {
            title,
            href,
            published,
            summary
          }
        })
        .sort((a, b) => {
          if (a.published > b.published) {
            return -1
          }
          if (a.published < b.published) {
            return 1
          }
          return 0
        })

      const HTML = entries
        .slice(0, 5)
        .map(({title, href, summary}) => generateTemplate(title, href, summary))
        .join('')

      setInnerHTML(containerElement, HTML)
    })
}

export default loadEntries
