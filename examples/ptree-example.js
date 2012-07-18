#!/usr/bin/env node

var ptree = require('../').ptree;

ptree(function(err, tree) {
  if (err) throw err;
  console.log(JSON.stringify(tree, null, 2));
});
