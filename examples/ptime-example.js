#!/usr/bin/env node

var ptime = require('../').ptime;

ptime(function(err, time) {
  if (err) throw err;
  console.log(JSON.stringify(time, null, 2));
});
