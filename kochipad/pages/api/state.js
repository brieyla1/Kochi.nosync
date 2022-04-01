const _ = require('lodash');
const config = require('../config.json');

const fs = require('fs');
let files = fs.readdirSync('./backend/state');
files = _.without(files, 'state.js');

const memoize = require('memoizee');

class State {
  constructor() {
    this.functions = {};
    // read every .js in this directory for the state loop
    // we also use debouncing to optimize response times.
    files.forEach((file, i) => {
      const cls = require('./' + file);
      const key = Object.keys(cls)[0];

      this.functions[key] = memoize(cls[key], { maxAge: config.cache_in_seconds, preFetch: true });
    });
  }
}

module.exports = new State();
