'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

tape.test('testcases from issues list', function(test) {
    var name = 'issues';
    var testcase = new TestCase(name, [ 'issues.proto' ]);

    test.ok(!testcase.generate(), 'shoule be compilable');

    testcase.loadLibrary('minimal');
    testcase.requireBundles();

    var root = protobuf.roots[name];
    
    var def = new root.issues.Issue_1({
        'com': 'field1',
        'pro': 0xc0ffee02,
        'err': 0xc0ffee03,
        'biz1': 0xc0ffee04,
        'biz2': 'field5',
        'com2': 0xc0ffee06,
        'ext': new Uint8Array([9, 9, 9, 9, 9, 9, 9, 9, 9]),
        'body': new Uint8Array([10, 10, 10, 10, 10, 10, 10, 10, 10]),
        'downstream': protobuf.util.Long.fromBits(11, 11, true),
        'con': protobuf.util.Long.fromBits(12, 12, true),
        'ctx': protobuf.util.Long.fromBits(13, 13, true)
    });

    var decoded = root.issues.Issue_1.decode(root.issues.Issue_1.encode(def).finish());
    test.same(def, decoded, 'issue#1: value after encoded & decoded should be the same');

    test.end();
});
