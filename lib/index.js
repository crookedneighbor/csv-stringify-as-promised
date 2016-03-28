'use strict'

let csvStringify = require('csv-stringify')
let PromiseProvider = Promise

function csvStringifyAsPromised (input, options) {
  options = options || {}

  return new PromiseProvider((resolve, reject) => {
    csvStringify(input, options, (err, csv) => {
      if (err) return reject(err)
      resolve(csv)
    })
  })
}

Object.defineProperty(csvStringifyAsPromised, 'Promise', {
  get: function () {
    return PromiseProvider
  },
  set: function (lib) {
    PromiseProvider = lib
  }
})

module.exports = csvStringifyAsPromised
