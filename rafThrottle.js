const rafThrottle = callback => {
  let requestId
  let pending

  const later = (context, args) => () => {
    requestId = null
    callback.apply(context, args)
  }

  const throttled = function(...args) {
    if ((requestId === null) || (requestId === undefined)) {
      pending = later(this, args)
      requestId = requestAnimationFrame(pending)
    }
  }

  throttled.cancel = (callPending = false) => {
    cancelAnimationFrame(requestId)
    callPending && pending && pending()
    pending = null
    requestId = null
  }

  return throttled
}

export default rafThrottle
