'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

tape.test('field option \'default\' test', function(test) {
    var name = 'option_default';
    var testcase = new TestCase(name, [ 'foo.proto' ]);

    test.ok(!testcase.generate(), 'shoule be compilable');

    testcase.loadLibrary('minimal');
    testcase.requireBundles();

    var root = protobuf.roots[name];
    
    var def1 = new root.foo.Default();
    test.same(def1.a, 'x', 'omitted optional string field should be set to default');
    test.same(def1.b, -100, 'omitted optional numeric field should be set to default');
    test.same(def1.c, protobuf.util.Long.fromBits(100, 0, true), 'omitted optional numeric field should be set to default');

    var def2 = root.foo.Default.decode(root.foo.Default.encode(def1).finish());
    test.same(def2.a, 'x', 'omitted optional string field should be set to default after serialization');
    test.same(def2.b, -100, 'omitted optional numeric field should be set to default after serialization');
    test.same(def2.c, protobuf.util.Long.fromBits(100, 0, true), 'omitted optional numeric field should be set to default after serialization');

    var def3 = new root.foo.Default({ 'a': 'y', 'b': -200, 'c': 200 });
    test.same(def3.a, 'y', 'non-ommited optional string field should be set as specified');
    test.same(def3.b, -200, 'non-ommited optional numeric field should be set as specified');
    test.same(def3.c, 200, 'non-ommited optional numeric field should be set as specified');

    var def4 = root.foo.Default.decode(root.foo.Default.encode(def3).finish());
    test.same(def4.a, 'y', 'non-ommited optional string field should be set as specified after serialization');
    test.same(def4.b, -200, 'non-ommited optional numeric field should be set as specified after serialization');
    test.same(def4.c, 200, 'non-ommited optional numeric field should be set as specified after serialization');

    test.end();
});
