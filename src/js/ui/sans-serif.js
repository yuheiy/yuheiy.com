import {contentLoaded} from 'document-promises'
import useragent from 'express-useragent'

export default async () => {
  const ua = useragent.parse(navigator.userAgent)
  if (ua.platform === 'Apple Mac' || ua.isiPad || ua.isiPhone || ua.isiPod) {
    return
  }

  await contentLoaded

  document.documentElement.classList.add('sans-serif')
}
