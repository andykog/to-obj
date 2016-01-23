to-obj
======
Supersmall array/object to plain old javascript object converter.
Compatible with CommonJS / SystemJS / AMD.

Install
-------
```
npm install --save to-obj
```


Object from Array
-----------------

Like Object.assign({}, array):
```js
toObj(['a', 'b']); // { 0: 'a', 1: 'b' }
```

With value provided:
```js
toObj(['a', 'b'], 'value');   // { a: 'value', b: 'value' }
toObj(['a', 'b'], undefined); // { a: undefined, b: undefined }
```

With values from array:
```js
toObj(['a', 'b'], [1, 2]); // { a: 1, b: 2 }
```

With transformer function:
```js
toObj(['a', 'b'], (value, index) => value + '-' + index); // { a: 'a-0', b: 'b-1' }
```

Object from athother object
---------------------------

Returns shallow copy of given object:
```js
const myObject = {'a': 3, 'b': 4 };
const newObject = toObj(myObject);
newObject;                          // {'a': 3, 'b': 4 }
newObject === myObject;             // false
```

With value provided:
```js
toObj({'a': 3, 'b': 4 }, 'something'); // { a: 'something', b: 'something' }
```

With transformer function:
```js
toObj({'a': 3, 'b': 4 }, (value, key) => key + '-' + value); // { a: 'a-3', b: 'b-4' }
```

Also works with object-like values:
```js
const func = function() {};
func.test = 1;
func.t = 2;
toObj(func);       // { test: 1, t: 2 }
toObj(func, null); // { test: null, t: null }
```
