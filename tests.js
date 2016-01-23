describe('toObj', function() {

  describe('from falthy values', function() {
    it('should throw if given falthy value', function() {
      expect(function() { toObj(0); })
        .toThrowError("toObj: Expected argument 0 to be array/object-like, given “0”");
    });
  });

  describe('from array', function() {
    var array = ['a', 'b'];

    it('should transform array to object like lowdash if no transformer given', function() {
      expect(toObj(array)).toEqual({ 0: 'a', 1: 'b' });
    });

    it('should transform array to object with a given value', function() {
      expect(toObj(array, 5)).toEqual({ a: 5, b: 5 });
      expect(toObj(array, undefined)).toEqual({ a: undefined, b: undefined });
    });

    it('should transform array to object with values from array', function() {
      expect(toObj(array, [8, 9])).toEqual({ a: 8, b: 9 });
    });

    it('should transform array to object with a transformer', function() {
      var transformer = function(value, index) { return value + '-' + index; };
      expect(toObj(array, transformer)).toEqual({ a: 'a-0', b: 'b-1' });
    });
  });

  describe('from object', function() {
    var object = {'a': 3, 'b': 4 };

    it('should never return the same object', function() {
      expect(toObj(object)).not.toBe(object);
    });

    it('should return duplicated object if no transformer given', function() {
      expect(toObj(object)).toEqual({ a: 3, b: 4 });
    });

    it('should return map values to a given value', function() {
      expect(toObj(object, 'val')).toEqual({ a: 'val', b: 'val' });
    });

    // For interface uniformity
    it('should return object with values from array', function() {
      expect(toObj(object, [8, 9])).toEqual({ a: 8, b: 9 });
    });

    it('should return mapped values with a transformer', function() {
      var transformer = function(value, key) { return key + '-' + value; };
      expect(toObj(object, transformer)).toEqual({ a: 'a-3', b: 'b-4' });
    });
  });

  describe('from object-like values', function() {
    var func = function() {};
    func.a = 8;

    it('should return plain object', function() {
      expect(toObj(func)).toEqual({ a: 8 });
      expect(typeof toObj(func)).toEqual('object');
    });
  });
});
