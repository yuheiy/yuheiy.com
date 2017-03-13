import useragent from 'express-useragent'

export default async () => {
  const ua = useragent.parse(navigator.userAgent)
  if (ua.isChrome) return

  const styleEl = document.createElement('style')
  document.head.appendChild(styleEl)
  const styleSheet = styleEl.sheet
  styleSheet.insertRule('rt { text-align: center }')
}
