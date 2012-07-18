var pcred = require('../').pcred,
    assert = require('assert');

pcred(function(err, cred) {
  if (err) throw err;
  console.log('Checking UID and GID');
  assert.strictEqual(process.getuid(), cred.uid);
  assert.strictEqual(process.getgid(), cred.gid);
  console.log('ok');
});
