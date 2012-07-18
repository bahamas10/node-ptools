var exec = require('exec');

module.exports = function(pid, callback) {
  exec(['pstop', pid], function(err, out, code) {
    return callback(err || null);
  });
};
