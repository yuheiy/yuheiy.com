const ua = navigator.userAgent

let _os
export const detectOs = () => {
  if (!_os) {
    if (ua.match(/Windows NT/)) {
      _os = 'Windows'
    } else if (ua.match(/Mac OS X/)) {
      _os = 'Mac OS'
    } else if (ua.match(/iPhone OS/) || ua.match(/iPad; CPU OS/)) {
      _os = 'iOS'
    } else {
      _os = 'Unknown'
    }
  }

  return _os
}
