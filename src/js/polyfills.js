import 'es6-promise/auto'

export default async () => {
  if (!window.fetch) {
    await import('whatwg-fetch')
  }
}
