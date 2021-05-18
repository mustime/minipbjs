'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

tape.test('enum test', function(test) {
    var name = 'enumx';
    var testcase = new TestCase(name, [ 'foo.proto' ]);

    test.ok(!testcase.generate(), 'shoule be compilable');

    testcase.loadLibrary('minimal');
    testcase.requireBundles();

    var root = protobuf.roots[name];
    var enm = root.foo.Test;

    test.ok(enm[1] === 'ONE', 'should be ok with integer-indexed');
    test.ok(typeof enm.ONE === 'number', 'should be ok with key-indexed');

    test.end();
});
