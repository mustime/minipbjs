'use strict';

var tape = require('tape'),
    TestCase = require('..').TestCase;

tape.test('verify test', function(test) {
    var name = 'verify';
    var testcase = new TestCase(name, [ 'foo.proto' ]);
    test.ok(!testcase.generate([ '--keep-case' ]), 'shoule be compilable');

    testcase.loadLibrary('minimal');
    testcase.requireBundles();

    var root = protobuf.roots[name];

    let baseMsg = {
        base_field: 0,
        base_field2: 1,
        base_field3: 2,
        base_field4: 4,
        base_field5: 5,
        base_field6: 6,
        base_field7: 7,
        base_field8: 8,
        base_field9: 9,
        base_field10: 10,
        base_field11: 11,
        base_field12: 12,
        base_field13: true,
        base_field14: 1,
        base_field15: new Uint8Array([1, 2, 3]),
    };

    let invalidStr = root.verify.Base.verify(baseMsg);
    test.same(invalidStr, 'verify.verify.Base.base_field14: string expected', 'should be the same');
    baseMsg.base_field14 = '14';
    let baseVerified = root.verify.Base.verify(baseMsg);
    test.same(baseVerified, null, 'should be the same');

    let mapMsg = {
        map_field1: { 'x': 'a' },
        map_field2: { 1: 'a' },
        map_field3: { 1: 'a' },
        map_field4: { 1: 'a' },
        map_field5: { 1: 'a' },
        map_field6: { 1: 'a' },
        map_field7: { 1: 'a' },
        map_field8: { 1: 'a' },
        map_field9: { 1: 'a' },
        map_field10: { 1: 'a' },
        map_field11: { [true]: 'a' },
        map_field12: { [true]: baseMsg },
    };
    let invalidKey = root.verify.Map.verify(mapMsg);
    test.same(invalidKey, 'verify.verify.Map.map_field1: key{k:int32} expected', 'should be the same');
    mapMsg.map_field1 = { 1: 'a' };
    let mapVerified = root.verify.Map.verify(mapMsg);
    test.same(mapVerified, null, 'should be the same');

    let repeatedMsg = {
        repeated_field1: ['x'],
        repeated_field2: [1],
        repeated_field3: [1],
        repeated_field4: [1],
        repeated_field5: [1],
        repeated_field6: [1],
        repeated_field7: [1],
        repeated_field8: [1],
        repeated_field9: [1],
        repeated_field10: [1],
        repeated_field11: [1],
        repeated_field12: [1],
        repeated_field13: [true],
        repeated_field14: ['xx'],
        repeated_field15: [new Uint8Array([1, 2, 3])],
        repeated_field16: [baseMsg], 
    };
    
    let invalidRepeatedVerified = root.verify.Repeated.verify(repeatedMsg);
    test.same(invalidRepeatedVerified, 'verify.verify.Repeated.repeated_field1[0]: float|double[] expected', 'should be the same');
    repeatedMsg.repeated_field1 = [1];
    let repeatedVerified = root.verify.Repeated.verify(repeatedMsg);
    test.same(repeatedVerified, null, 'should be the same');

    let embeddedMsg = {
        base_field: baseMsg,
        map_field: mapMsg,
    };
    let embeddedVerified = root.verify.Embedded.verify(embeddedMsg);
    test.same(embeddedVerified, null, 'should be the same');

    let enumMsg = {
        enum_field: 1,
    };
    let enumVerified = root.verify.EnumMessage.verify(enumMsg);
    test.same(enumVerified, null, 'should be the same');
    enumMsg.enum_field = 'a';
    let invalidEnumVerified = root.verify.EnumMessage.verify(enumMsg);
    test.same(invalidEnumVerified, 'verify.verify.EnumMessage.enum_field: enum value expected', 'should be the same');

    test.end();
});
