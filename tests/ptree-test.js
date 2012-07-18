var ptree = require('../').ptree;

ptree(function(err, tree) {
  if (err) throw err;
  console.log('ok');
});
