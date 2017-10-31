import loadPolyfills from './polyfills'

;(async () => {
  await loadPolyfills()

  require('./ui/set-detected-os').default()
  require('./ui/detect-web-font-loading').default()
  require('./ui/author-photo').default()
})()
