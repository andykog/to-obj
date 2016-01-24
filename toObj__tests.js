describe('toObj', function() {

  describe('from falthy values', function() {
    it('should throw if given falthy value', function() {
      expect(function() { toObj(0); })
        .toThrowError('toObj(source, transformer): Expected source to be array/object-like, given “0”');
    });
  });

  describe('from array', function() {
    var array = ['a', 'b'];

    it('should transform array to object like Object.assign if no transformer given', function() {
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

    it('may return object with values from array', function() {
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

describe('toObj.byKey', function() {
  var array = [{ id: 'theId', val: 'theVal' }];
  var object = {'a': { id: 'theId', val: 'theVal' } };
  var toObjByIdS = toObj.byKey('id');
  var toObjByIdF = toObj.byKey(function(element, key) { return element.id; });

  describe('from array', function() {
    var array = [{ id: 'theId', val: 'theVal' }];

    it('should transform array to object like Object.assign if no transformer given', function() {
      expect(toObjByIdS(array)).toEqual({ theId: { id: 'theId', val: 'theVal' } });
      expect(toObjByIdF(array)).toEqual({ theId: { id: 'theId', val: 'theVal' } });
    });

    it('should transform array to object with a given value', function() {
      expect(toObjByIdS(array, 5)).toEqual({ theId: 5 });
      expect(toObjByIdF(array, 5)).toEqual({ theId: 5 });
    });

    it('should transform array to object with a transformer', function() {
      var transformer = function(value, index) { return value.val + '-' + index; };
      expect(toObjByIdS(array, transformer)).toEqual({ theId: 'theVal-0' });
      expect(toObjByIdF(array, transformer)).toEqual({ theId: 'theVal-0' });
    });
  });

  describe('from object', function() {
    it('should return map values to a given value', function() {
      expect(toObjByIdS(object, 'val')).toEqual({ theId: 'val' });
      expect(toObjByIdF(object, 'val')).toEqual({ theId: 'val' });
    });

    it('should return object with values from array', function() {
      expect(toObjByIdS(object, [8, 9])).toEqual({ theId: 8 });
      expect(toObjByIdF(object, [8, 9])).toEqual({ theId: 8 });
    });

    it('should return mapped values with a transformer', function() {
      var transformer = function(value, key) { return key + '-' + value.val; };
      expect(toObjByIdS(object, transformer)).toEqual({ theId: 'a-theVal' });
      expect(toObjByIdF(object, transformer)).toEqual({ theId: 'a-theVal' });
    });
  });

  describe('using function predicate', function() {
    it('should receive correct array element and index', function() {
      toObj.byKey(function(element, index) {
        expect(element).toBe(array[0]);
        expect(index).toBe(0);
      })(array);
    });
    it('should receive correct object element and key', function() {
      toObj.byKey(function(element, key) {
        expect(element).toBe(object.a);
        expect(key).toBe('a');
      })(object);
    });
  })
});
