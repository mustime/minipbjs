'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

tape.test('service test', function(test) {
    var name = 'service';
    var testcase = new TestCase(name, [ 'foo.proto' ]);

    test.ok(!testcase.generate(), 'shoule be compilable');

    testcase.loadLibrary('minimal');
    testcase.requireBundles();

    var root = protobuf.roots[name];
    
    var fooReq = new root.foo.FooReq({ 'id': 100, 'payload': protobuf.util.Long.fromNumber(1000) });
    
    const simpleForward = function(method, bytes, cb) {
        var req = root.foo.FooReq.decode(bytes);
        var res = {
            'id': req.id + 1,
            'req': req
        }
        cb(null, root.foo.FooRes.encode(res).finish());
    };

    var service = root.foo.Foo.create(simpleForward);
    service.bar(fooReq, function(err, fooRes) {
        test.same(err, null, 'should be no error');
        test.same(fooReq.id + 1, fooRes.id, 'forward should work');
        test.same(fooReq.id, fooRes.req.id, 'forward should work');
        test.same(fooReq.payload, fooRes.req.payload, 'forward should work');
    });

    test.end();
});
