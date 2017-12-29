const td = require('testdouble');
const bluebird = require('bluebird');
const expect = require('chai').expect;
const csvStringifyAsPromised = require('../lib');

const input = [
  ['header1', 'header2', 'header3'],
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['g', 'h', 'i'],
];

describe('csv-stringify-as-promised', () => {
  beforeEach(() => {
    csvStringifyAsPromised.csvStringify = null;
    csvStringifyAsPromised.Promise = null;
  });

  context('csv-stringify', () => {
    it('resolves with string when csv-stringify callback completes', async () => {
      const csvStringify = td.function();
      td.when(csvStringify(input, {}, td.callback)).thenCallback(null, 'stringified csv');
      csvStringifyAsPromised.csvStringify = csvStringify;
      csvStringifyAsPromised.Promise = Promise;

      const string = await csvStringifyAsPromised(input);
      td.verify(csvStringify(input, {}, td.callback));
      expect(string).to.eql('stringified csv');
    });

    it('rejects with error when csv-stringify callback errors', async () => {
      const csvStringify = td.function();
      td.when(csvStringify(input, {}, td.callback)).thenCallback('an error');
      csvStringifyAsPromised.csvStringify = csvStringify;
      csvStringifyAsPromised.Promise = Promise;

      try {
        await csvStringifyAsPromised(input);
        expect.fail();
      } catch (err) {
        td.verify(csvStringify(input, {}, td.callback));
        expect(err).to.eql('an error');
      }
    });

    it('passes on options to csv-stringify', async () => {
      const options = { quotedString: true };
      const csvStringify = td.function();
      td.when(csvStringify(input, options, td.callback)).thenCallback(null, 'foo');
      csvStringifyAsPromised.csvStringify = csvStringify;
      csvStringifyAsPromised.Promise = Promise;

      await csvStringifyAsPromised(input, options);
      td.verify(csvStringify(input, options, td.callback));
    });
  });

  context('custom promises', () => {
    beforeEach(() => {
      const csvStringify = td.function();
      td.when(csvStringify(input, {}, td.callback)).thenCallback(null, 'stringified csv');
      csvStringifyAsPromised.csvStringify = csvStringify;
    });

    it('uses Node\'s built-in Promise object by default', () => {
      csvStringifyAsPromised.Promise = Promise;
      const promise = csvStringifyAsPromised(input);

      expect(promise).to.be.an.instanceOf(Promise);
    });

    it('allows you to use your preferred promise library', async () => {
      csvStringifyAsPromised.Promise = bluebird;

      const promise = csvStringifyAsPromised(input);

      expect(promise).to.be.an.instanceOf(bluebird);

      const csvData = await promise;
      expect(csvData).to.eql('stringified csv');
    });
  });
});
