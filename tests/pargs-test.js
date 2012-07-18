#!/usr/bin/env node

var pargs = require('../').pargs,
    path = require('path'),
    assert = require('assert');

pargs(function(err, obj) {
  if (err) throw err;
  console.log('Checking env variables');
  assert.strictEqual(process.env.HOME, obj.envp.HOME);
  console.log('Checking args 0 & 1');
  assert.strictEqual(path.basename(process.argv[0]), path.basename(obj.argv[0]));
  assert.strictEqual(path.basename(process.argv[1]), path.basename(obj.argv[1]));
  console.log('ok');
});
