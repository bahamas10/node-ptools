var exec = require('exec');

module.exports = function(pid, callback) {
  exec(['prun', pid], function(err, out, code) {
    return callback(err || null);
  });
};
