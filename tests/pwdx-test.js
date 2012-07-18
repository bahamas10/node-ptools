var pwdx = require('../').pwdx,
    assert = require('assert');

pwdx(process.pid, function(err, dir) {
  if (err) throw err;
  console.log('process.cwd() = "%s"', process.cwd());
  console.log('pwdx(%d) = "%s"', process.pid, dir);
  assert.strictEqual(dir, process.cwd());
  console.log('ok');
});
