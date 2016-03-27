'use strict'

let csvStringify = require('csv-stringify')

function csvStringifyAsPromised (input) {
  return new Promise((resolve, reject) => {
    csvStringify(input, (err, csv) => {
      if (err) return reject(err)
      resolve(csv)
    })
  })
}

module.exports = csvStringifyAsPromised
