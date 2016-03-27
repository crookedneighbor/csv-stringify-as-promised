'use strict'

let td = require('testdouble')
let csv = td.replace('csv-stringify')
let expect = require('chai').expect

let csvStringify = require('../lib')

describe('csv-stringify-as-promised', () => {
  afterEach(function () {
    td.reset()
  })

  context('csv-stringify', () => {
    beforeEach(function () {
      this.input = [
        ['header1', 'header2', 'header3'],
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]
    })

    it('resolves with string when csv-stringify callback completes', function (done) {
      td.when(csv(this.input, td.callback)).thenCallback(null, 'stringified csv')

      csvStringify(this.input).then((string) => {
        td.verify(csv(), {ignoreExtraArgs: true})
        expect(string).to.eql('stringified csv')
        done()
      }).catch(done)
    })

    it('rejects with error when csv-stringify callback errors', function (done) {
      td.when(csv(this.input, td.callback)).thenCallback('an error')

      csvStringify(this.input).then(done).catch((err) => {
        td.verify(csv(), {ignoreExtraArgs: true})
        expect(err).to.eql('an error')
        done()
      })
    })
  })
})
