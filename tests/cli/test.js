'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

function functionalityTest(name, option, testcase, functionality, test) {
    var optionHint = (option ? ' with option "' + option + '"' : '');
    test.ok(!testcase.generate(option ? [ option ] : undefined),  'shoule be compilable' + optionHint);
    testcase.requireBundles();
    test.ok(typeof protobuf.roots[name] === 'object', 'root "' + name + '" should be available');
    test.ok(typeof protobuf.roots[name].foo === 'object', 'package "foo" should be available');
    test.ok(typeof protobuf.roots[name].bar === 'object', 'package "bar" should be available');
    test.ok(typeof protobuf.roots[name].foo.Foo === 'function', 'class "foo.Foo" should be available');
    test.ok(typeof protobuf.roots[name].bar.Bar === 'function', 'class "bar.Bar" should be available');
    for (var func in functionality) {
        var available = functionality[func];
        if (func[0] === '#') {
            // instance methods
            func = func.substring(1);
            test.ok(typeof protobuf.roots[name].foo.Foo.prototype[func] === (available ? 'function' : 'undefined'), '"foo.Foo.prototype.' + func + '" should ' + (available ? 'be' : 'not be') + ' available' + optionHint);
            test.ok(typeof protobuf.roots[name].bar.Bar.prototype[func] === (available ? 'function' : 'undefined'), '"bar.Bar.prototype.' + func + '" should ' + (available ? 'be' : 'not be') + ' available' + optionHint);
        } else {
            // static method
            test.ok(typeof protobuf.roots[name].foo.Foo[func] === (available ? 'function' : 'undefined'), '"foo.Foo.' + func + '" should ' + (available ? 'be' : 'not be') + ' available' + optionHint);
            test.ok(typeof protobuf.roots[name].bar.Bar[func] === (available ? 'function' : 'undefined'), '"bar.Bar.' + func + '" should ' + (available ? 'be' : 'not be') + ' available' + optionHint);
        }
    }
    testcase.unrequireBundles();
}

tape.test('command line test', function(test) {
    // sharable protobuf library
    new TestCase().loadLibrary('minimal');

    var name = 'cli';
    var testcase1 = new TestCase(name, [ 'foo.proto', 'bar.proto' ]);

    functionalityTest(name, null, testcase1, {
        'create': true,
        'encode': true, 'encodeDelimited': true,
        'decode': true, 'decodeDelimited': true,
        'fromObject': true, 'toObject': true, '#toJSON': true
    }, test);

    functionalityTest(name, '--no-create', testcase1, {
        'create': false,
        'encode': true, 'encodeDelimited': true,
        'decode': true, 'decodeDelimited': true,
        'fromObject': true, 'toObject': true, '#toJSON': true
    }, test);

    functionalityTest(name, '--no-encode', testcase1, {
        'create': true,
        'encode': false, 'encodeDelimited': false,
        'decode': true, 'decodeDelimited': true,
        'fromObject': true, 'toObject': true, '#toJSON': true
    }, test);

    functionalityTest(name, '--no-decode', testcase1, {
        'create': true,
        'encode': true, 'encodeDelimited': true,
        'decode': false, 'decodeDelimited': false,
        'fromObject': true, 'toObject': true, '#toJSON': true
    }, test);
    
    functionalityTest(name, '--no-delimited', testcase1, {
        'create': true,
        'encode': true, 'encodeDelimited': false,
        'decode': true, 'decodeDelimited': false,
        'fromObject': true, 'toObject': true, '#toJSON': true
    }, test);

    functionalityTest(name, '--no-convert', testcase1, {
        'create': true,
        'encode': true, 'encodeDelimited': true,
        'decode': true, 'decodeDelimited': true,
        'fromObject': false, 'toObject': false, '#toJSON': false
    }, test);

    var testcase2 = new TestCase(name, [ 'bar.proto' ]);
    test.throws(function () {
        testcase2.generate();
    }, 'shoule not be compilable(missing \'foo.Foo\')');
    
    test.end();
});
