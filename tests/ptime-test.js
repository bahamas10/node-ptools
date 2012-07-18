var ptime = require('../').ptime;

ptime(function(err, time) {
  if (err) throw err;
  console.log(JSON.stringify(time));
  console.log('ok');
});
