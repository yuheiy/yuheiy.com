import 'es6-promise/auto'

export default async () => {
  if (!self.fetch) {
    await import('whatwg-fetch')
  }
}
