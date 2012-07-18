var exec = require('exec');

/**
 * parse the output of pldd
 */
function parse_output(s) {
  return s.trim().split('\n').slice(1);
}

module.exports = function(pid, callback) {
  if (typeof pid === 'function') {
    callback = pid;
    pid = process.pid;
  }

  exec(['pldd', pid], function(err, out, code) {
    if (err) return callback(err);
    callback(null, parse_output(out));
  });
};
