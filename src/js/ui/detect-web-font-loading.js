import {detectOs} from '../util/user-agent'

const os = detectOs()
const isMacOrIos = os === 'Mac OS' || os === 'iOS'

export default async () => {
  if (!isMacOrIos) {
    return
  }

  const WebFont = await import('webfontloader')

  WebFont.load({
    google: {
      families: ['PT Serif:400,700'],
    },
  })
}
