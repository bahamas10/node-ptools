var fs = require('fs');

module.exports = function(pid, callback) {
  if (typeof pid === 'function') {
    callback = pid;
    pid = 'self';
  }

  fs.readlink('/proc/' + pid + '/path/cwd', function(err, res) {
    return callback(err, res);
  });
};
