#!/usr/bin/env node

var pwdx = require('../').pwdx;

pwdx(process.pid, function(err, dir) {
  if (err) throw err;
  console.log('process.cwd() = "%s"', process.cwd());
  console.log('pwdx(%d) = "%s"', process.pid, dir);
});
