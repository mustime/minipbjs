'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

tape.test('syntax2/syntax3 test', function(test) {
    var name = 'syntax';
    var testcase = new TestCase(name, [ 'syntax_proto2.proto', 'syntax_proto3.proto' ]);

    test.ok(!testcase.generate(), 'mixed syntax protofiles generatation should be acceptable');

    testcase.loadLibrary('minimal');
    testcase.requireBundles();

    var root = protobuf.roots[name];
    
    var foo2 = new root.proto2.Foo({ 'a': 100 });
    var foo3 = new root.proto3.Foo({ 'a': 100 });
    test.same(
        root.proto2.Foo.encode(foo2).finish(),
        root.proto3.Foo.encode(foo3).finish(),
        'fields are optional in proto3 by default');

    var puz2 = new root.proto2.Puz({ 'c': [ 'a', 'b', 'c' ], 'd': [ 'd', 'e' ] });
    var puz3 = new root.proto3.Puz({ 'c': [ 'a', 'b', 'c' ], 'd': [ 'd', 'e' ] });
    test.same(
        root.proto2.Puz.encode(puz2).finish(),
        root.proto3.Puz.encode(puz3).finish(),
        'repeated fields in proto3 is packed by default');

    var bar2 = root.proto2.Bar.create({ 'a': 'test', 'b': 101, 'c': [ 1, 2 ], 'd': foo2, 'e': [ foo2, foo2 ], 'f': { '100': true }, 'g': { 'test': foo2 }, 'i': puz2 });
    var bar3 = root.proto3.Bar.create({ 'a': 'test', 'b': 101, 'c': [ 1, 2 ], 'd': foo3, 'e': [ foo3, foo3 ], 'f': { '100': true }, 'g': { 'test': foo3 }, 'i': puz3 });
    test.same(
        root.proto2.Bar.encode(bar2).finish(),
        root.proto3.Bar.encode(bar3).finish(),
        'should work on a bit more complex message');

    var qux2 = root.proto2.Qux.create({ 'a': [ 1, 2 ] });
    var qux3 = root.proto3.Qux.create({ 'a': [ 1, 2 ] });
    test.same(qux2.a.length, qux3.a.length, 'should be of same length');

    test.notSame(
        root.proto2.Qux.encode(qux2).finish(),
        root.proto3.Qux.encode(qux3).finish(),
        'numeric repetead types in proto2 is non-packed by default');

    var quux2 = root.proto2.Quux.create({ 'a': [ 'a', 'b' ] });
    var quux3 = root.proto3.Quux.create({ 'a': [ 'a', 'b' ] });
    test.same(quux2.a.length, quux3.a.length, 'should be of same length');

    test.same(
        root.proto2.Quux.encode(quux2).finish(),
        root.proto3.Quux.encode(quux3).finish(),
        'string repetead types in proto2 is packed by default');

    test.end();
});
