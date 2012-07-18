
var merge = require('merge-recursive'),
    exec = require('exec'),
    step = 2;

/**
 * Given a string, count the blank spaces
 * at the beginning
 */
function get_indent_level(s) {
  var indent = 0;
  for (var i in s) {
    if (s.charAt(i) === ' ') continue;
    indent = +i;
    break;
  }
  return indent;
}

/**
 * Process a string containing the output from ptree
 */
function make_tree(s) {
  var lines = s.trim().split('\n'),
      levels = [],
      obj = {},
      elems,
      indent,
      pid,
      proc;

  for (var i in lines) {
    // Get indent level and element
    indent = get_indent_level(lines[i]) / step;
    elems = lines[i].trim().split(' ');
    pid = +elems[0];
    proc = elems.slice(1).join(' ');

    // Pop off unneeded levels
    while (indent < levels.length) levels.pop();
    levels.push(pid);

    // Convert levels to object, thanks Mortchek in ##javascript
    d = levels.reverse().reduce(function (prev_object, next) {
      var o = {};
      o[next] = { 'children' : prev_object, 'proc' : proc };
      return o;
    }, {});

    // Merge in the array
    obj = merge.recursive(obj,d);

    // Reset
    levels.reverse();
  }

  return obj;
}

/**
 * Extract from ptree
 */
module.exports = function(callback) {
  exec(['ptree', '-a'], function(err, out, code) {
    if (err) return callback(err);
    callback(null, make_tree(out));
  });
};
