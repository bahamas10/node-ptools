var exec = require('exec');

/**
 * parse the output of pcred
 */
function parse_output(s) {
  var split = s.trim().split('\n');
  // get uid and gid
  var match = split[0].match(/.*uid=(\d+).*gid=(\d+)/),
      obj = { 'uid': +match[1], 'gid': +match[2] };

  // Extract groups if present
  if (split[1] && split[1].match(/groups: /)) {
    obj.groups = split[1].replace(/.*groups: /, '').split(' ');
  } else {
    obj.groups = [];
  }

  // Return it
  return obj;
}

module.exports = function(pid, callback) {
  if (typeof pid === 'function') {
    callback = pid;
    pid = process.pid;
  }

  exec(['pcred', pid], function(err, out, code) {
    if (err) return callback(err);
    callback(null, parse_output(out));
  });
};
