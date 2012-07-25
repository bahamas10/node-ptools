var exec = require('exec');

/**
 * parse the output of ptime
 */
function parse_output(s) {
  var d = {};
  s.trim().split('\n').forEach(function(line) {
    var split = line.trim().split(/\s+/);
    d[split[0]] = +split[1];
  });
  return d;
}

module.exports = function(pid, callback) {
  if (typeof pid === 'function') {
    callback = pid;
    pid = process.pid;
  }

  exec(['ptime', '-p', pid], function(err, out, code) {
    if (out) return callback(out);
    callback(null, parse_output(err));
  });
};
