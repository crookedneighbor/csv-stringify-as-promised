# csv-stringify-as-promised

The [`csv-stringify`](http://npmjs.com/csv-stringify) is great, but it doesn't support promises! This module is a lightweight promise wrapper around it. The only prod dependency is `csv-stringify`.

## Usage

```js
'use strict'

let stringify = require('csv-stringify-as-promised')
let assert = require('assert')

let input = [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]

stringify(input).then((output) => {
  assert.equal(output, '1,2,3,4\na,b,c,d\n')
}).catch((err) => {
  // handle error
})
```

You can pass any [`csv-stringify` options](http://csv.adaltas.com/stringify/) by passing an object as the second argument.

```js
let options = { quotedString: true }

stringify(input, options).then((output) => {
  assert.equal(output, '"1","2","3","4"\n"a","b","c","d"\n')
}).catch((err) => {
  // handle error
})
```


### Use your own promise library

By default, this module uses Node's builtin `Promise` object, but if you prefer to use a different promise library, you can do so simply by overwriting the `Promise` property on the module.

```js
'use strict'

let stringify = require('csv-stringify-as-promised')
let bluebird = require('bluebird')

stringify.Promise = bluebird

let input = [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]

stringify(input).then((output) => {
  // uses bluebird instead of Promise
}).catch((err) => {
  // handle error
})
```

## Requirements

This module requires Node v4 or greater

## Tests

```
npm t
```
