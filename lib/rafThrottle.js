'use strict';

var rafThrottle = function rafThrottle(callback) {
  var requestId = void 0;
  var pending = void 0;

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

      pending = later(this, args);
      requestId = requestAnimationFrame(pending);
    }
  };

  throttled.cancel = function () {
    var callPending = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    cancelAnimationFrame(requestId);
    callPending && pending && pending();
    pending = null;
    requestId = null;
  };

  return throttled;
};

module.exports = rafThrottle;
