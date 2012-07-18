var exec = require('exec'),
    argv_re = /argv\[\d+\]: (.*)$/,
    envp_re = /envp\[\d+\]: ([^=]*)=(.*)$/;

/**
 * parse the output of pargs
 */
function parse_output(s) {
  var split = s.trim().split('\n').slice(1),
      obj = { 'argv': [], 'envp': {} };

  split.forEach(function(line) {
    var s;
    s = argv_re.exec(line);
    if (s) {
      // argv
      return obj.argv.push(s[1]);
    }

    s = envp_re.exec(line);
    if (s) {
      // envp
      return obj.envp[s[1]] = s[2];
    }
  });
  return obj;
}

module.exports = function(pid, callback) {
  if (typeof pid === 'function') {
    callback = pid;
    pid = process.pid;
  }

  exec(['pargs', '-ae', pid], function(err, out, code) {
    if (err) return callback(err);
    callback(null, parse_output(out));
  });
};
