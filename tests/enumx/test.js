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
    test.ok(enm[0] === 'ONE', 'should be ok with integer-indexed');
    test.ok(typeof enm.ONE === 'number', 'should be ok with key-indexed');

    var enm2 = root.foo.Inner.Test2;
    test.ok(enm2[0] === enm[0], 'should be ok with integer-indexed(inner)');
    test.ok(typeof enm2.ONE === typeof enm.ONE, 'should be ok with key-indexed(inner)');

    var inner = root.foo.Inner.create({ 'test': 1, 'test2': 1 });
    test.ok(inner, 'create should work');
    test.ok(inner.test == enm.TWO, 'enum value should be the same');
    test.ok(inner.test2 == enm2.TWO, 'enum value should be the same');

    var inner2 = root.foo.Inner.decode(root.foo.Inner.encode(inner).finish());
    test.ok(inner2, 'decode should work');
    test.ok(inner2.test == enm.TWO, 'decoded enum value should be the same');
    test.ok(inner2.test2 == enm2.TWO, 'decoded enum value should be the same');

    test.end();
});
