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

Like `Object.assign({}, array)`:
```js
const arr = ['a', 'b'];
toObj(arr); // { 0: 'a', 1: 'b' }
```

With value provided:
```js
const arr = ['a', 'b'];
toObj(arr, 'value');    // { a: 'value', b: 'value' }
toObj(arr, undefined);  // { a: undefined, b: undefined }
```

With values from array:
```js
const arr = ['a', 'b'];
toObj(arr, [1, 2]);     // { a: 1, b: 2 }
```

With transformer function:
```js
const arr = ['a', 'b'];
const transformer = (value, index) => value + '-' + index;
toObj(arr, transformer); // { a: 'a-0', b: 'b-1' }
```

Object from athother object
---------------------------

Returns shallow copy of given object:
```js
const obj = { a: 3, b: 4 };
const newObject = toObj(obj);
newObject;       // { a: 3, b: 4 }
obj === newObj;  // false
```

With value provided:
```js
const obj = { a: 3, b: 4 };
toObj(obj, 'something'); // { a: 'something', b: 'something' }
```

With transformer function:
```js
const obj = { a: 3, b: 4 };
const transformer = (value, key) => key + '-' + value;
toObj(obj, transformer); // { a: 'a-3', b: 'b-4' }
```

Also works with object-like values:
```js
const func = function() {};
func.test = 1;
func.t = 2;
toObj(func);       // { test: 1, t: 2 }
toObj(func, null); // { test: null, t: null }
```

toObj.byKey
===========

If you have array of users:

```js
const users = [
  { id: 111, name: 'bob' },
  { id: 222, name: 'den' },
];
```

and you want to convert it to dictionary of users by `id`, just provide key or function returning key:

```js
const toObjById = toObj.byKey((user, index) => user.id);

// Or (shortcut):
const toObjById = toObj.byKey('id');

toObjById(users); // {
                  //   111: { id: 111, name: 'bob' },
                  //   222: { id: 222, name: 'dan' }
                  // }

```

This works as described before, for example, lets take *object* of users:

```js
const users = {
  z: { id: 111, name: 'bob' },
  x: { id: 222, name: 'den' },
};

// second argument does the same thing described in “With transformer function”:
toObjById(users, user => user.name); // {
                                     //   111: 'bob',
                                     //   222: 'dan',
                                     // }
```
