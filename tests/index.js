#! /usr/bin/env node
// -*- js -*-

'use strict';

var path = require('path'),
    cli  = require(path.join(__dirname, '..', 'cli', 'index.js'));

var commonArgs = [ '--keep-case', '--force-number', '--path', path.join(__dirname, 'protos'), '1.proto', '2.proto', '--out', __dirname ];

var ret = 0;
ret = cli.main(commonArgs.concat([ '--root', 'mini', '--name', 'protobuf-bundles-mini' ]));
if (typeof ret === 'number' && ret > 0) process.exit(ret);
ret = cli.main(commonArgs.concat([ '--root', 'orig', '--target', 'static', '--name', 'protobuf-bundles-orig' ]));
if (typeof ret === 'number' && ret > 0) process.exit(ret);

global.protobuf = require(path.join(__dirname, '..', 'node_modules', 'protobufjs'));
global.$protobuf = global.protobuf;

require('./protobuf-bundles-mini.js');
require('./protobuf-bundles-orig.js');

var MINI = protobuf.roots.mini;
var ORIG = protobuf.roots.orig;

var foo = MINI.foo.Foo.create({ 'a': 1, 'b': 'test1' })
var bar = new MINI.foo.Bar({ 'j': new MINI.foo.Puz({ 'a': 100, 'b': 'test100', 'c': ['a', 'b'] }) });
bar.c = bar.d = [ 1, 2, 3, 4, 5 ];
bar.e = bar.f = [ foo, foo ];
bar.g = { '1': true, '2': false };
bar.h = { '1': foo, '2': foo };

var buff = MINI.foo.Bar.encode(bar).finish();
var bar2 = MINI.foo.Bar.decode(buff);

console.log(bar2.a);
console.log(bar2.b);
console.log(bar2.c.length);
console.log(bar2.d.length);
console.log(bar2.e[0].a);
console.log(bar2.f[1].b);
console.log(bar2.g[1]);
console.log(bar2.h[2]['b']);
console.log(bar2.j.a);
console.log(bar2.j.b);
console.log(bar2.j.c.join(', '));
