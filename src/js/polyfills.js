export default async () => {
  if (!Promise) {
    await import('es6-promise/auto')
  }

  if (!fetch) {
    await import('whatwg-fetch')
  }
}
