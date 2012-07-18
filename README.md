Illumos ptools
==============

Use Solaris/Illumos proc(1) tools in Node.js

**NOTE**: read the manpage before using any of these tools to understand their risks!

Install
------

    npm install ptools

Usage
-----

``` js
var ptools = require('ptools');
```

Functions
---------

### ptools.pwdx([pid], callback(err, dir))

Get the current working directory of a given pid (defaults to `self`)

### ptools.ptree(callback(err, tree))

Get the full process tree on the system.  The return object is a series
of nested objects with `children` and `proc` values, keyed off the `pid`.

### ptools.pcred([pid], callback(err, cred))

Get the credentials of a running process (uid, gid, etc)

### ptools.pldd([pid], callback(err, libraries))

Get a list of loaded libraries of a running process

### ptools.pwait(pid, callback(err))

Fire the callback when a given pid dies

### ptools.ptime([pid], callback(err, time))

Grabs a ptime snapshot of a given pid (defaults to self)

### ptools.prun(pid, callback(err))

Call `prun` on a given pid.  No arguments other than a possible exception are
given to the completion callback.

### ptools.pstop(pid, callback(err))

Call `pstop` on a given pid.  No arguments other than a possible exception are
given to the completion callback.

### ptools.pargs([pid], callback(err, obj))

This function will parse the output of `pargs -ea` to get the full environment and
argument list returned as `{ argv: [], envp: {} }`.

Examples
--------

### ptools.pwdx

``` js
var pwdx = require('ptools').pwdx;

pwdx(process.pid, function(err, dir) {
  console.log('process.cwd() = "%s"', process.cwd());
  console.log('pwdx(%d) = "%s"', process.pid, dir);
});
```
yields
```
process.cwd() = "/home/dave/dev/node-ptools"
pwdx(27780) = "/home/dave/dev/node-ptools"
```

### ptools.ptree

``` js
var ptree = require('ptools').ptree;

ptree(function(err, tree) {
  console.log(tree);
});
```
yields (snipped for brevity)
``` json
{
  "16349": {
    "children": {},
    "proc": "/sbin/init"
  },
  "16387": {
    "children": {},
    "proc": "/lib/svc/bin/svc.configd"
  },
  "16836": {
    "children": {},
    "proc": "/sbin/sh /lib/svc/method/svc-dlmgmtd"
  },
  "18992": {
    "children": {
      "18996": {
        "children": {},
        "proc": "splunkd -p 9000 start"
      }
    },
    "proc": "splunkd -p 9000 start"
  }
}
```

### ptools.pcred

``` js
var pcred = require('ptools').pcred;

pcred(function(err, cred) {
  console.log(cred);
});
```
yields
``` json
{
  "uid": 2011,
  "gid": 2300,
  "groups": []
}
```

### ptools.pldd

``` js
var pldd = require('ptools').pldd;

pldd(function(err, libraries) {
  console.log(libraries);
});
```
yields
``` json
[
  "/lib/libz.so.1",
  "/lib/librt.so.1",
  "/lib/libssl.so.0.9.8",
  "/lib/libcrypto.so.0.9.8",
  "/lib/libdl.so.1",
  "/lib/libsocket.so.1",
  "/lib/libnsl.so.1",
  "/lib/libkstat.so.1",
  "/opt/local/lib/libstdc++.so.6.0.16",
  "/lib/libm.so.2",
  "/opt/local/lib/libgcc_s.so.1",
  "/lib/libc.so.1"
]
```

### ptools.pwait

``` js
var pwait = require('ptools').pwait;

pwait(245, function(err) {
  if (err) throw err;
  console.log('done');
});
```

This callback will fire when process `245` has exited.  err will be set if
any stderr was produced.

### ptools.ptime

``` js
var ptime = require('ptools').ptime;

ptime(function(err, time) {
  console.log(time);
});
```
yields
``` json
{
  "real": "0.230678959",
  "user": "0.129828895",
  "sys": "0.079168602"
}
```

### ptools.prun

``` js
var prun = require('ptools').prun;

prun(578, function(err) {
  if (err) throw err;
  console.log('done');
});
```

This will call `prun` on pid `578`, and callback when it is done with a
possible error.

### ptools.pstop

``` js
var pstop = require('ptools').pstop;

pstop(578, function(err) {
  if (err) throw err;
  console.log('done');
});
```

This will call `pstop` on pid `578`, and callback when it is done with a
possible error.

### ptools.pargs

``` js
var pargs = require('ptools').pargs;

pargs(function(err, obj) {
  console.log(obj);
});
```
yields
``` json
{
  "argv": [
    "node",
    "examples/pargs-example.js"
  ],
  "envp": {
    "SHELL": "/usr/bin/bash",
    "TERM": "xterm-color",
    "MYVIMRC": "/home/dave/.vimrc",
    "USER": "dave",
    "PAGER": "less",
    "PATH": "/opt/local/bin:/opt/local/sbin:/usr/bin:/usr/sbin:/home/dave/bin",
    "MAIL": "/var/mail/dave",
    "_": "/opt/local/bin/node",
    "PWD": "/home/dave/dev/node-ptools",
    "EDITOR": "vim",
    "LANG": "en_US.UTF-8",
    "TZ": "US/Pacific",
    "HOME": "/home/dave",
    "VISUAL": "vim",
  }
}
```

Known Limitations
-----------------

Some scripts are JS implementations of the ptools, and some just fork+exec their respective tool.

### JS Implementation

* pwdx

### forx+exec

* pargs
* pldd
* ptree
* pcred
* pwait
* ptime

Tests
-----

    npm test

License
-------

MIT Licensed
