# csv-stringify-as-promised

The [`csv-stringify`](http://npmjs.com/csv-stringify) is great, but it doesn't support promises! This module is a lightweight promise wrapper around it. The only prod dependency is `csv-stringify`.

## Usage

```js
'use strict'

let stringify = require('csv-stringify-as-promised')
let assert = require('assert')

let input = [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]

stringify(input).then((output) => {
  assert.eql(output, '1,2,3,4\na,b,c,d\n')
}).catch((err) => {
  // handle error
})
```

## Tests

```
npm t
```
