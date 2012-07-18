#!/usr/bin/env node

var pcred = require('../').pcred;

pcred(function(err, cred) {
  if (err) throw err;
  console.log(JSON.stringify(cred, null, 2));
});
