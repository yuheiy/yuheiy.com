import {detectOs} from '../util/user-agent'

const os = detectOs()
const isUnknown = os === 'Unknown'

export default () => {
  if (!isUnknown) {
    document.documentElement.dataset.os = os
  }
}
