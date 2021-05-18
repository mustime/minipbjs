'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

tape.test('encode/decode test', function(test) {
    var name = 'codec';
    var testcase = new TestCase(name, [ 'foo.proto' ]);

    test.ok(!testcase.generate([ '--keep-case' ]), 'shoule be compilable');

    testcase.loadLibrary('minimal');
    testcase.requireBundles();

    var root = protobuf.roots[name];
    
    const message0 = {
        'x': 1.5,
        'y': -2.5,
    };
    // normal message
    var packed0 = root.foo.Nested.decode(root.foo.Nested.encode(message0).finish());
    test.same(message0, root.foo.Nested.toObject(packed0), 'should be the same');

    var message1 = {
        'field_int32': { [-1]: 'testing', [1]: '🙉🙈🙊' },
        'field_uint32': { [-1 >>> 0]: new Uint8Array([1, 2, 3]), [1]: new Uint8Array([254, 255]) },
        // TODO long support
        // 'field_sint32': { [-1]: protobuf.util.LongBits.from(123, 234), [1]: protobuf.util.LongBits.from(-1, -2) },
        'field_string': { 'testing': 12.34, '🙉🙈🙊': 56.78 },
        'field_fixed32': { [-1 >>> 0]: false, [1]: true },
        'field_sfixed32': { [-1]: { x: 2 }, [1]: { y: -2 } }
    };
    // int and string key map
    var packed1 = root.foo.MapTestIntAndString.decode(root.foo.MapTestIntAndString.encode(message1).finish());
    test.same(message1, root.foo.MapTestIntAndString.toObject(packed1), 'int and string key map should be the same');

    // TODO long support
    // var message2 = {
    //     'field_int64': { '\uFEDC\uBA98\u7654\u3210': 'testing 🙉🙈🙊' },
    //     'field_uint64': { '\uBA98\u7654\u3210\uFEDC': new Uint8Array([0, 1, 254, 255]) },
    //     'field_sint64': { '\u7654\u3210\uFEDC\uBA98': new Long(-1, -2) },
    //     'field_fixed64': { '\u3210\uFEDC\uBA98\u7654': 12.34 },
    //     'field_sfixed64': { '\uFEDC\uBA98\u7654\u3210': true },
    //     'field_bool': { false: { x: 2 }, true: { y: -2 } },
    // };
    // // long and bool key map
    // var packed2 = root.foo.MapTestLongAndBool.decode(root.foo.MapTestLongAndBool.encode(message2).finish());
    // test.same(message2, root.foo.MapTestLongAndBool.toObject(packed2), 'long and bool key map should be the same');

    test.end();
});
