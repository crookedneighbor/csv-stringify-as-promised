let csvStringify = require('csv-stringify');

let PromiseProvider = Promise;

function csvStringifyAsPromised(input, options) {
  options = options || {};

  return new PromiseProvider((resolve, reject) => {
    csvStringify(input, options, (err, csv) => {
      if (err) return reject(err);

      return resolve(csv);
    });
  });
}

Object.defineProperty(csvStringifyAsPromised, 'Promise', {
  get() {
    return PromiseProvider;
  },
  set(lib) {
    PromiseProvider = lib;
  },
});

Object.defineProperty(csvStringifyAsPromised, 'csvStringify', {
  get() {
    return csvStringify;
  },
  set(lib) {
    csvStringify = lib;
  },
});

module.exports = csvStringifyAsPromised;
