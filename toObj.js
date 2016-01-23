(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && define.amd) define(name, definition);
  else context[name] = definition();
}('toObj', this, function () {

  var isArray = Array.isArray || function isArray(arg) { return Object.prototype.toString.call(arg) === '[object Array]'; };

  return function toObj(source, transformer) {
    var k, obj = {};

    if (!source || typeof source !== 'object' && typeof source !== 'function') {
      throw new Error("toObj: Expected argument 0 to be array/object-like, given “" + source + "”");
    }

    if (isArray(source)) {
      if (arguments.length < 2) {
        for (k = 0; k < source.length; k++) obj[k] = source[k];
      } else if (typeof transformer === 'function') {
        for (k = 0; k < source.length; k++) obj[source[k]] = transformer(source[k], k);
      } else if (isArray(transformer)) {
        for (k = 0; k < source.length; k++) obj[source[k]] = transformer[k];
      } else {
        for (k = 0; k < source.length; k++) obj[source[k]] = transformer;
      }
    } else { // object given
      if (arguments.length < 2) {
        for (k in source) if (source.hasOwnProperty(k)) obj[k] = source[k];
      } else if (typeof transformer === 'function') {
        for (k in source) if (source.hasOwnProperty(k)) obj[k] = transformer(source[k], k);
      } else if (isArray(transformer)) {
        var unsafeIndex = 0;
        for (k in source) if (source.hasOwnProperty(k)) obj[k] = transformer[unsafeIndex++];
      } else {
        for (k in source) if (source.hasOwnProperty(k)) obj[k] = transformer;
      }
    }

    return obj;
  };
}));
