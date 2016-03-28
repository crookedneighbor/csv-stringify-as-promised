'use strict'

let td = require('testdouble')
let csv = td.replace('csv-stringify')
let expect = require('chai').expect

let csvStringify = require('../lib')

describe('csv-stringify-as-promised', () => {
  beforeEach(function () {
    this.input = [
      ['header1', 'header2', 'header3'],
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h', 'i']
    ]
  })

  afterEach(function () {
    td.reset()
  })

  context('csv-stringify', () => {
    it('resolves with string when csv-stringify callback completes', function (done) {
      td.when(csv(this.input, {}, td.callback)).thenCallback(null, 'stringified csv')

      csvStringify(this.input).then((string) => {
        td.verify(csv(this.input, {}, td.callback))
        expect(string).to.eql('stringified csv')
        done()
      }).catch(done)
    })

    it('rejects with error when csv-stringify callback errors', function (done) {
      td.when(csv(this.input, {}, td.callback)).thenCallback('an error')

      csvStringify(this.input).then(done).catch((err) => {
        td.verify(csv(this.input, {}, td.callback))
        expect(err).to.eql('an error')
        done()
      })
    })

    it('passes on options to csv-stringify', function (done) {
      let options = { quotedString: true }
      td.when(csv(this.input, options, td.callback)).thenCallback(null, 'foo')

      csvStringify(this.input, options).then((string) => {
        td.verify(csv(this.input, options, td.callback))
        done()
      }).catch(done)
    })
  })

  context('custom promises', () => {
    beforeEach(() => {
      td.when(csv(this.input, {}, td.callback)).thenCallback(null, 'stringified csv')
    })

    it('uses Node\'s built-in Promise object by default', function () {
      let promise = csvStringify(this.input)

      expect(promise).to.be.an.instanceOf(Promise)
    })

    it('allows you to use your preferred promise library', function (done) {
      let bluebird = require('bluebird')
      csvStringify.Promise = bluebird

      let promise = csvStringify(this.input)

      expect(promise).to.be.an.instanceOf(bluebird)

      promise.then((csv) => {
        expect(csv).to.eql('stringified csv')
        csvStringify.Promise = Promise
        done()
      }).catch(done)
    })
  })
})
