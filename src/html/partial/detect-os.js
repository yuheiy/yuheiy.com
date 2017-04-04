(function() {
  var ua = navigator.userAgent
  var os = ''

  if (ua.match(/Windows NT/)) {
    os = 'Windows'
  } else if (ua.match(/Mac OS X/)) {
    os = 'Mac OS'
  } else if (ua.match(/iPhone OS/) || ua.match(/iPad; CPU OS/)) {
    os = 'iOS'
  }

  document.documentElement.dataset.os = os
})()
