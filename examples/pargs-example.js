#!/usr/bin/env node

var pargs = require('../').pargs;

pargs(function(err, obj) {
  if (err) throw err;
  console.log(JSON.stringify(obj, null, 2));
});
