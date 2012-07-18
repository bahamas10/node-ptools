#!/usr/bin/env node

var pldd = require('../').pldd;

pldd(function(err, libraries) {
  if (err) throw err;
  console.log(JSON.stringify(libraries, null, 2));
});
