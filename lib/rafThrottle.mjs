var rafThrottle = function rafThrottle(callback) {
  var requestId = void 0;

  var later = function later(context, args) {
    return function () {
      requestId = null;
      callback.apply(context, args);
    };
  };

  var throttled = function throttled() {
    if (requestId === null || requestId === undefined) {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      requestId = requestAnimationFrame(later(this, args));
    }
  };

  throttled.cancel = function () {
    cancelAnimationFrame(requestId);
    requestId = null;
  };

  return throttled;
};

export default rafThrottle;
