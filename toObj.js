(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && define.amd) define(name, definition);
  else context[name] = definition();
}('toObj', this, function () {

  var toObj = function toObj(pred, source, transformer) {
    if (!source || typeof source !== 'object' && typeof source !== 'function') {
      throw new Error('toObj(source, transformer): Expected source to be array/object-like, given “' + source + '”');
    }
    var k, obj = {};

    if (source instanceof Array) {
      if (arguments.length < 3) {
        for (k = 0; k < source.length; k++) obj[pred ? pred(source[k], k) : k] = source[k];
      } else if (typeof transformer === 'function') {
        for (k = 0; k < source.length; k++) obj[pred ? pred(source[k], k) : source[k]] = transformer(source[k], k);
      } else if (transformer instanceof Array) {
        for (k = 0; k < source.length; k++) obj[pred ? pred(source[k], k) : source[k]] = transformer[k];
      } else {
        for (k = 0; k < source.length; k++) obj[pred ? pred(source[k], k) : source[k]] = transformer;
      }
    } else { // object given
      if (arguments.length < 3) {
        for (k in source) if (source.hasOwnProperty(k)) obj[pred ? pred(source[k], k) : k] = source[k];
      } else if (typeof transformer === 'function') {
        for (k in source) if (source.hasOwnProperty(k)) obj[pred ? pred(source[k], k) : k] = transformer(source[k], k);
      } else if (transformer instanceof Array) { // For interface uniformity
        var unsafeIndex = 0;
        for (k in source) if (source.hasOwnProperty(k)) obj[pred ? pred(source[k], k) : k] = transformer[unsafeIndex++];
      } else {
        for (k in source) if (source.hasOwnProperty(k)) obj[pred ? pred(source[k], k) : k] = transformer;
      }
    }
    return obj;
  };

  var finalToObj = toObj.bind(null, undefined);
  finalToObj.byKey = function(predicate) {
    var finalPredicate = typeof predicate === 'function' ? predicate : function (element, key) { return element[predicate]; };
    return toObj.bind(null, finalPredicate);
  };
  return finalToObj;
}));
