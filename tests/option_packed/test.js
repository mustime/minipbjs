'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

tape.test('field option \'packed\' test', function(test) {
    var name = 'option_packed';
    var testcase = new TestCase(name, [ 'foo.proto' ]);

    test.ok(!testcase.generate([ '--keep-case' ]), 'shoule be compilable');

    testcase.loadLibrary('minimal');
    testcase.requireBundles();

    var root = protobuf.roots[name];
    
    // TODO long support
    var message = {
        'field_int32': [-1, -2],
        // 'field_int64': [new Long(-1, -2), new Long(-3, -4)],
        'field_uint32': [-1 >>> 0, -2 >>> 0],
        // 'field_uint64': [new Long(-1 >>> 0, -2 >>> 0, true), new Long(-3 >>> 0, -4 >>> 0, true)],
        'field_sint32': [-1, -2],
        // 'field_sint64': [new Long(-1, -2), new Long(-3, -4)],
        'field_bool': [true, false],
        // 'field_fixed64': [new Long(12345678, 87654321, true), new Long(8765, 1234, true)],
        // 'field_sfixed64': [new Long(-87654321, -12345678), new Long(-1234, -8765)],
        'field_double': [2.5, -2.5],
        'field_string': ['testing', '🙉🙈🙊'],
        'field_bytes': [new Uint8Array([1, 2, 3, 4, 5]), new Uint8Array([]), new Uint8Array([5, 4, 3])],
        'field_fixed32': [-1 >>> 0, -2 >>> 0],
        'field_sfixed32': [-1, -2],
        'field_float': [3.25, -3.25],
        'field_nested': [{ x: 1.5 }, {}, { y: 0.5 }],
    };
    
    // packed = true
    var packed1 = root.foo.RepeatedPacked.decode(root.foo.RepeatedPacked.encode(message).finish());
    test.same(message, root.foo.RepeatedPacked.toObject(packed1), 'repeated packed should be the same');

    // packed = false
    var packed2 = root.foo.RepeatedUnpacked.decode(root.foo.RepeatedUnpacked.encode(message).finish());
    test.same(message, root.foo.RepeatedUnpacked.toObject(packed2), 'repeated unpacked should be the same');

    test.end();
});
