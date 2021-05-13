// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots.orig || ($protobuf.roots.orig = {});

$root.foo = (function() {

    /**
     * Namespace foo.
     * @exports foo
     * @namespace
     */
    var foo = {};

    foo.Foo = (function() {

        /**
         * Properties of a Foo.
         * @memberof foo
         * @interface IFoo
         * @property {number} a Foo a
         * @property {string|null} [b] Foo b
         */

        /**
         * Constructs a new Foo.
         * @memberof foo
         * @classdesc Represents a Foo.
         * @implements IFoo
         * @constructor
         * @param {foo.IFoo=} [properties] Properties to set
         */
        function Foo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Foo a.
         * @member {number} a
         * @memberof foo.Foo
         * @instance
         */
        Foo.prototype.a = 0;

        /**
         * Foo b.
         * @member {string|null|undefined} b
         * @memberof foo.Foo
         * @instance
         */
        Foo.prototype.b = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Foo _b.
         * @member {"b"|undefined} _b
         * @memberof foo.Foo
         * @instance
         */
        Object.defineProperty(Foo.prototype, "_b", {
            get: $util.oneOfGetter($oneOfFields = ["b"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Foo instance using the specified properties.
         * @function create
         * @memberof foo.Foo
         * @static
         * @param {foo.IFoo=} [properties] Properties to set
         * @returns {foo.Foo} Foo instance
         */
        Foo.create = function create(properties) {
            return new Foo(properties);
        };

        /**
         * Encodes the specified Foo message. Does not implicitly {@link foo.Foo.verify|verify} messages.
         * @function encode
         * @memberof foo.Foo
         * @static
         * @param {foo.IFoo} message Foo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Foo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.a);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.b);
            return writer;
        };

        /**
         * Encodes the specified Foo message, length delimited. Does not implicitly {@link foo.Foo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof foo.Foo
         * @static
         * @param {foo.IFoo} message Foo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Foo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Foo message from the specified reader or buffer.
         * @function decode
         * @memberof foo.Foo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {foo.Foo} Foo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Foo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.foo.Foo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.a = reader.uint32();
                    break;
                case 2:
                    message.b = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("a"))
                throw $util.ProtocolError("missing required 'a'", { instance: message });
            return message;
        };

        /**
         * Decodes a Foo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof foo.Foo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {foo.Foo} Foo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Foo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Foo message.
         * @function verify
         * @memberof foo.Foo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Foo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (!$util.isInteger(message.a))
                return "a: integer expected";
            if (message.b != null && message.hasOwnProperty("b")) {
                properties._b = 1;
                if (!$util.isString(message.b))
                    return "b: string expected";
            }
            return null;
        };

        /**
         * Creates a Foo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof foo.Foo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {foo.Foo} Foo
         */
        Foo.fromObject = function fromObject(object) {
            if (object instanceof $root.foo.Foo)
                return object;
            var message = new $root.foo.Foo();
            if (object.a != null)
                message.a = object.a >>> 0;
            if (object.b != null)
                message.b = String(object.b);
            return message;
        };

        /**
         * Creates a plain object from a Foo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof foo.Foo
         * @static
         * @param {foo.Foo} message Foo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Foo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.a = 0;
            if (message.a != null && message.hasOwnProperty("a"))
                object.a = message.a;
            if (message.b != null && message.hasOwnProperty("b")) {
                object.b = message.b;
                if (options.oneofs)
                    object._b = "b";
            }
            return object;
        };

        /**
         * Converts this Foo to JSON.
         * @function toJSON
         * @memberof foo.Foo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Foo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Foo;
    })();

    foo.Bar = (function() {

        /**
         * Properties of a Bar.
         * @memberof foo
         * @interface IBar
         * @property {string|null} [a] Bar a
         * @property {number|null} [b] Bar b
         * @property {Array.<number>|null} [c] Bar c
         * @property {Array.<number>|null} [d] Bar d
         * @property {Array.<foo.IFoo>|null} [e] Bar e
         * @property {Array.<foo.IFoo>|null} [f] Bar f
         * @property {Object.<string,boolean>|null} [g] Bar g
         * @property {Object.<string,foo.IFoo>|null} [h] Bar h
         * @property {foo.IPuz} j Bar j
         */

        /**
         * Constructs a new Bar.
         * @memberof foo
         * @classdesc Represents a Bar.
         * @implements IBar
         * @constructor
         * @param {foo.IBar=} [properties] Properties to set
         */
        function Bar(properties) {
            this.c = [];
            this.d = [];
            this.e = [];
            this.f = [];
            this.g = {};
            this.h = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Bar a.
         * @member {string|null|undefined} a
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.a = null;

        /**
         * Bar b.
         * @member {number|null|undefined} b
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.b = null;

        /**
         * Bar c.
         * @member {Array.<number>} c
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.c = $util.emptyArray;

        /**
         * Bar d.
         * @member {Array.<number>} d
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.d = $util.emptyArray;

        /**
         * Bar e.
         * @member {Array.<foo.IFoo>} e
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.e = $util.emptyArray;

        /**
         * Bar f.
         * @member {Array.<foo.IFoo>} f
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.f = $util.emptyArray;

        /**
         * Bar g.
         * @member {Object.<string,boolean>} g
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.g = $util.emptyObject;

        /**
         * Bar h.
         * @member {Object.<string,foo.IFoo>} h
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.h = $util.emptyObject;

        /**
         * Bar j.
         * @member {foo.IPuz} j
         * @memberof foo.Bar
         * @instance
         */
        Bar.prototype.j = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Bar _a.
         * @member {"a"|undefined} _a
         * @memberof foo.Bar
         * @instance
         */
        Object.defineProperty(Bar.prototype, "_a", {
            get: $util.oneOfGetter($oneOfFields = ["a"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Bar _b.
         * @member {"b"|undefined} _b
         * @memberof foo.Bar
         * @instance
         */
        Object.defineProperty(Bar.prototype, "_b", {
            get: $util.oneOfGetter($oneOfFields = ["b"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Bar instance using the specified properties.
         * @function create
         * @memberof foo.Bar
         * @static
         * @param {foo.IBar=} [properties] Properties to set
         * @returns {foo.Bar} Bar instance
         */
        Bar.create = function create(properties) {
            return new Bar(properties);
        };

        /**
         * Encodes the specified Bar message. Does not implicitly {@link foo.Bar.verify|verify} messages.
         * @function encode
         * @memberof foo.Bar
         * @static
         * @param {foo.IBar} message Bar message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bar.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.a);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.b);
            if (message.c != null && message.c.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (var i = 0; i < message.c.length; ++i)
                    writer.uint32(message.c[i]);
                writer.ldelim();
            }
            if (message.d != null && message.d.length)
                for (var i = 0; i < message.d.length; ++i)
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.d[i]);
            if (message.e != null && message.e.length)
                for (var i = 0; i < message.e.length; ++i)
                    $root.foo.Foo.encode(message.e[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.f != null && message.f.length)
                for (var i = 0; i < message.f.length; ++i)
                    $root.foo.Foo.encode(message.f[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.g != null && Object.hasOwnProperty.call(message, "g"))
                for (var keys = Object.keys(message.g), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 7, wireType 2 =*/58).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).bool(message.g[keys[i]]).ldelim();
            if (message.h != null && Object.hasOwnProperty.call(message, "h"))
                for (var keys = Object.keys(message.h), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.foo.Foo.encode(message.h[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            $root.foo.Puz.encode(message.j, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Bar message, length delimited. Does not implicitly {@link foo.Bar.verify|verify} messages.
         * @function encodeDelimited
         * @memberof foo.Bar
         * @static
         * @param {foo.IBar} message Bar message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bar.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Bar message from the specified reader or buffer.
         * @function decode
         * @memberof foo.Bar
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {foo.Bar} Bar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bar.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.foo.Bar(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.a = reader.string();
                    break;
                case 2:
                    message.b = reader.uint64();
                    break;
                case 3:
                    if (!(message.c && message.c.length))
                        message.c = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.c.push(reader.uint32());
                    } else
                        message.c.push(reader.uint32());
                    break;
                case 4:
                    if (!(message.d && message.d.length))
                        message.d = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.d.push(reader.uint32());
                    } else
                        message.d.push(reader.uint32());
                    break;
                case 5:
                    if (!(message.e && message.e.length))
                        message.e = [];
                    message.e.push($root.foo.Foo.decode(reader, reader.uint32()));
                    break;
                case 6:
                    if (!(message.f && message.f.length))
                        message.f = [];
                    message.f.push($root.foo.Foo.decode(reader, reader.uint32()));
                    break;
                case 7:
                    if (message.g === $util.emptyObject)
                        message.g = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = false;
                    while (reader.pos < end2) {
                        var tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.uint32();
                            break;
                        case 2:
                            value = reader.bool();
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.g[key] = value;
                    break;
                case 8:
                    if (message.h === $util.emptyObject)
                        message.h = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = "";
                    value = null;
                    while (reader.pos < end2) {
                        var tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.string();
                            break;
                        case 2:
                            value = $root.foo.Foo.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.h[key] = value;
                    break;
                case 10:
                    message.j = $root.foo.Puz.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("j"))
                throw $util.ProtocolError("missing required 'j'", { instance: message });
            return message;
        };

        /**
         * Decodes a Bar message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof foo.Bar
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {foo.Bar} Bar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bar.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Bar message.
         * @function verify
         * @memberof foo.Bar
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Bar.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.a != null && message.hasOwnProperty("a")) {
                properties._a = 1;
                if (!$util.isString(message.a))
                    return "a: string expected";
            }
            if (message.b != null && message.hasOwnProperty("b")) {
                properties._b = 1;
                if (!$util.isInteger(message.b) && !(message.b && $util.isInteger(message.b.low) && $util.isInteger(message.b.high)))
                    return "b: integer|Long expected";
            }
            if (message.c != null && message.hasOwnProperty("c")) {
                if (!Array.isArray(message.c))
                    return "c: array expected";
                for (var i = 0; i < message.c.length; ++i)
                    if (!$util.isInteger(message.c[i]))
                        return "c: integer[] expected";
            }
            if (message.d != null && message.hasOwnProperty("d")) {
                if (!Array.isArray(message.d))
                    return "d: array expected";
                for (var i = 0; i < message.d.length; ++i)
                    if (!$util.isInteger(message.d[i]))
                        return "d: integer[] expected";
            }
            if (message.e != null && message.hasOwnProperty("e")) {
                if (!Array.isArray(message.e))
                    return "e: array expected";
                for (var i = 0; i < message.e.length; ++i) {
                    var error = $root.foo.Foo.verify(message.e[i]);
                    if (error)
                        return "e." + error;
                }
            }
            if (message.f != null && message.hasOwnProperty("f")) {
                if (!Array.isArray(message.f))
                    return "f: array expected";
                for (var i = 0; i < message.f.length; ++i) {
                    var error = $root.foo.Foo.verify(message.f[i]);
                    if (error)
                        return "f." + error;
                }
            }
            if (message.g != null && message.hasOwnProperty("g")) {
                if (!$util.isObject(message.g))
                    return "g: object expected";
                var key = Object.keys(message.g);
                for (var i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i]))
                        return "g: integer key{k:uint32} expected";
                    if (typeof message.g[key[i]] !== "boolean")
                        return "g: boolean{k:uint32} expected";
                }
            }
            if (message.h != null && message.hasOwnProperty("h")) {
                if (!$util.isObject(message.h))
                    return "h: object expected";
                var key = Object.keys(message.h);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.foo.Foo.verify(message.h[key[i]]);
                    if (error)
                        return "h." + error;
                }
            }
            {
                var error = $root.foo.Puz.verify(message.j);
                if (error)
                    return "j." + error;
            }
            return null;
        };

        /**
         * Creates a Bar message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof foo.Bar
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {foo.Bar} Bar
         */
        Bar.fromObject = function fromObject(object) {
            if (object instanceof $root.foo.Bar)
                return object;
            var message = new $root.foo.Bar();
            if (object.a != null)
                message.a = String(object.a);
            if (object.b != null)
                if ($util.Long)
                    (message.b = $util.Long.fromValue(object.b)).unsigned = true;
                else if (typeof object.b === "string")
                    message.b = parseInt(object.b, 10);
                else if (typeof object.b === "number")
                    message.b = object.b;
                else if (typeof object.b === "object")
                    message.b = new $util.LongBits(object.b.low >>> 0, object.b.high >>> 0).toNumber(true);
            if (object.c) {
                if (!Array.isArray(object.c))
                    throw TypeError(".foo.Bar.c: array expected");
                message.c = [];
                for (var i = 0; i < object.c.length; ++i)
                    message.c[i] = object.c[i] >>> 0;
            }
            if (object.d) {
                if (!Array.isArray(object.d))
                    throw TypeError(".foo.Bar.d: array expected");
                message.d = [];
                for (var i = 0; i < object.d.length; ++i)
                    message.d[i] = object.d[i] >>> 0;
            }
            if (object.e) {
                if (!Array.isArray(object.e))
                    throw TypeError(".foo.Bar.e: array expected");
                message.e = [];
                for (var i = 0; i < object.e.length; ++i) {
                    if (typeof object.e[i] !== "object")
                        throw TypeError(".foo.Bar.e: object expected");
                    message.e[i] = $root.foo.Foo.fromObject(object.e[i]);
                }
            }
            if (object.f) {
                if (!Array.isArray(object.f))
                    throw TypeError(".foo.Bar.f: array expected");
                message.f = [];
                for (var i = 0; i < object.f.length; ++i) {
                    if (typeof object.f[i] !== "object")
                        throw TypeError(".foo.Bar.f: object expected");
                    message.f[i] = $root.foo.Foo.fromObject(object.f[i]);
                }
            }
            if (object.g) {
                if (typeof object.g !== "object")
                    throw TypeError(".foo.Bar.g: object expected");
                message.g = {};
                for (var keys = Object.keys(object.g), i = 0; i < keys.length; ++i)
                    message.g[keys[i]] = Boolean(object.g[keys[i]]);
            }
            if (object.h) {
                if (typeof object.h !== "object")
                    throw TypeError(".foo.Bar.h: object expected");
                message.h = {};
                for (var keys = Object.keys(object.h), i = 0; i < keys.length; ++i) {
                    if (typeof object.h[keys[i]] !== "object")
                        throw TypeError(".foo.Bar.h: object expected");
                    message.h[keys[i]] = $root.foo.Foo.fromObject(object.h[keys[i]]);
                }
            }
            if (object.j != null) {
                if (typeof object.j !== "object")
                    throw TypeError(".foo.Bar.j: object expected");
                message.j = $root.foo.Puz.fromObject(object.j);
            }
            return message;
        };

        /**
         * Creates a plain object from a Bar message. Also converts values to other types if specified.
         * @function toObject
         * @memberof foo.Bar
         * @static
         * @param {foo.Bar} message Bar
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Bar.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.c = [];
                object.d = [];
                object.e = [];
                object.f = [];
            }
            if (options.objects || options.defaults) {
                object.g = {};
                object.h = {};
            }
            if (options.defaults)
                object.j = null;
            if (message.a != null && message.hasOwnProperty("a")) {
                object.a = message.a;
                if (options.oneofs)
                    object._a = "a";
            }
            if (message.b != null && message.hasOwnProperty("b")) {
                if (typeof message.b === "number")
                    object.b = options.longs === String ? String(message.b) : message.b;
                else
                    object.b = options.longs === String ? $util.Long.prototype.toString.call(message.b) : options.longs === Number ? new $util.LongBits(message.b.low >>> 0, message.b.high >>> 0).toNumber(true) : message.b;
                if (options.oneofs)
                    object._b = "b";
            }
            if (message.c && message.c.length) {
                object.c = [];
                for (var j = 0; j < message.c.length; ++j)
                    object.c[j] = message.c[j];
            }
            if (message.d && message.d.length) {
                object.d = [];
                for (var j = 0; j < message.d.length; ++j)
                    object.d[j] = message.d[j];
            }
            if (message.e && message.e.length) {
                object.e = [];
                for (var j = 0; j < message.e.length; ++j)
                    object.e[j] = $root.foo.Foo.toObject(message.e[j], options);
            }
            if (message.f && message.f.length) {
                object.f = [];
                for (var j = 0; j < message.f.length; ++j)
                    object.f[j] = $root.foo.Foo.toObject(message.f[j], options);
            }
            var keys2;
            if (message.g && (keys2 = Object.keys(message.g)).length) {
                object.g = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.g[keys2[j]] = message.g[keys2[j]];
            }
            if (message.h && (keys2 = Object.keys(message.h)).length) {
                object.h = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.h[keys2[j]] = $root.foo.Foo.toObject(message.h[keys2[j]], options);
            }
            if (message.j != null && message.hasOwnProperty("j"))
                object.j = $root.foo.Puz.toObject(message.j, options);
            return object;
        };

        /**
         * Converts this Bar to JSON.
         * @function toJSON
         * @memberof foo.Bar
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Bar.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Bar;
    })();

    foo.Puz = (function() {

        /**
         * Properties of a Puz.
         * @memberof foo
         * @interface IPuz
         * @property {number|null} [a] Puz a
         * @property {string|null} [b] Puz b
         * @property {Array.<string>|null} [c] Puz c
         */

        /**
         * Constructs a new Puz.
         * @memberof foo
         * @classdesc Represents a Puz.
         * @implements IPuz
         * @constructor
         * @param {foo.IPuz=} [properties] Properties to set
         */
        function Puz(properties) {
            this.c = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Puz a.
         * @member {number} a
         * @memberof foo.Puz
         * @instance
         */
        Puz.prototype.a = 200;

        /**
         * Puz b.
         * @member {string} b
         * @memberof foo.Puz
         * @instance
         */
        Puz.prototype.b = "";

        /**
         * Puz c.
         * @member {Array.<string>} c
         * @memberof foo.Puz
         * @instance
         */
        Puz.prototype.c = $util.emptyArray;

        /**
         * Creates a new Puz instance using the specified properties.
         * @function create
         * @memberof foo.Puz
         * @static
         * @param {foo.IPuz=} [properties] Properties to set
         * @returns {foo.Puz} Puz instance
         */
        Puz.create = function create(properties) {
            return new Puz(properties);
        };

        /**
         * Encodes the specified Puz message. Does not implicitly {@link foo.Puz.verify|verify} messages.
         * @function encode
         * @memberof foo.Puz
         * @static
         * @param {foo.IPuz} message Puz message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Puz.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.a);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.b);
            if (message.c != null && message.c.length)
                for (var i = 0; i < message.c.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.c[i]);
            return writer;
        };

        /**
         * Encodes the specified Puz message, length delimited. Does not implicitly {@link foo.Puz.verify|verify} messages.
         * @function encodeDelimited
         * @memberof foo.Puz
         * @static
         * @param {foo.IPuz} message Puz message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Puz.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Puz message from the specified reader or buffer.
         * @function decode
         * @memberof foo.Puz
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {foo.Puz} Puz
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Puz.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.foo.Puz();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.a = reader.uint32();
                    break;
                case 2:
                    message.b = reader.string();
                    break;
                case 3:
                    if (!(message.c && message.c.length))
                        message.c = [];
                    message.c.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Puz message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof foo.Puz
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {foo.Puz} Puz
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Puz.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Puz message.
         * @function verify
         * @memberof foo.Puz
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Puz.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.a != null && message.hasOwnProperty("a"))
                if (!$util.isInteger(message.a))
                    return "a: integer expected";
            if (message.b != null && message.hasOwnProperty("b"))
                if (!$util.isString(message.b))
                    return "b: string expected";
            if (message.c != null && message.hasOwnProperty("c")) {
                if (!Array.isArray(message.c))
                    return "c: array expected";
                for (var i = 0; i < message.c.length; ++i)
                    if (!$util.isString(message.c[i]))
                        return "c: string[] expected";
            }
            return null;
        };

        /**
         * Creates a Puz message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof foo.Puz
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {foo.Puz} Puz
         */
        Puz.fromObject = function fromObject(object) {
            if (object instanceof $root.foo.Puz)
                return object;
            var message = new $root.foo.Puz();
            if (object.a != null)
                message.a = object.a >>> 0;
            if (object.b != null)
                message.b = String(object.b);
            if (object.c) {
                if (!Array.isArray(object.c))
                    throw TypeError(".foo.Puz.c: array expected");
                message.c = [];
                for (var i = 0; i < object.c.length; ++i)
                    message.c[i] = String(object.c[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a Puz message. Also converts values to other types if specified.
         * @function toObject
         * @memberof foo.Puz
         * @static
         * @param {foo.Puz} message Puz
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Puz.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.c = [];
            if (options.defaults) {
                object.a = 200;
                object.b = "";
            }
            if (message.a != null && message.hasOwnProperty("a"))
                object.a = message.a;
            if (message.b != null && message.hasOwnProperty("b"))
                object.b = message.b;
            if (message.c && message.c.length) {
                object.c = [];
                for (var j = 0; j < message.c.length; ++j)
                    object.c[j] = message.c[j];
            }
            return object;
        };

        /**
         * Converts this Puz to JSON.
         * @function toJSON
         * @memberof foo.Puz
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Puz.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Puz;
    })();

    return foo;
})();

$root.bar = (function() {

    /**
     * Namespace bar.
     * @exports bar
     * @namespace
     */
    var bar = {};

    bar.Foo = (function() {

        /**
         * Properties of a Foo.
         * @memberof bar
         * @interface IFoo
         * @property {number} a Foo a
         * @property {string|null} [b] Foo b
         */

        /**
         * Constructs a new Foo.
         * @memberof bar
         * @classdesc Represents a Foo.
         * @implements IFoo
         * @constructor
         * @param {bar.IFoo=} [properties] Properties to set
         */
        function Foo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Foo a.
         * @member {number} a
         * @memberof bar.Foo
         * @instance
         */
        Foo.prototype.a = 0;

        /**
         * Foo b.
         * @member {string} b
         * @memberof bar.Foo
         * @instance
         */
        Foo.prototype.b = "";

        /**
         * Creates a new Foo instance using the specified properties.
         * @function create
         * @memberof bar.Foo
         * @static
         * @param {bar.IFoo=} [properties] Properties to set
         * @returns {bar.Foo} Foo instance
         */
        Foo.create = function create(properties) {
            return new Foo(properties);
        };

        /**
         * Encodes the specified Foo message. Does not implicitly {@link bar.Foo.verify|verify} messages.
         * @function encode
         * @memberof bar.Foo
         * @static
         * @param {bar.IFoo} message Foo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Foo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.a);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.b);
            return writer;
        };

        /**
         * Encodes the specified Foo message, length delimited. Does not implicitly {@link bar.Foo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bar.Foo
         * @static
         * @param {bar.IFoo} message Foo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Foo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Foo message from the specified reader or buffer.
         * @function decode
         * @memberof bar.Foo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bar.Foo} Foo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Foo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bar.Foo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.a = reader.uint32();
                    break;
                case 2:
                    message.b = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("a"))
                throw $util.ProtocolError("missing required 'a'", { instance: message });
            return message;
        };

        /**
         * Decodes a Foo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bar.Foo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bar.Foo} Foo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Foo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Foo message.
         * @function verify
         * @memberof bar.Foo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Foo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.a))
                return "a: integer expected";
            if (message.b != null && message.hasOwnProperty("b"))
                if (!$util.isString(message.b))
                    return "b: string expected";
            return null;
        };

        /**
         * Creates a Foo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bar.Foo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bar.Foo} Foo
         */
        Foo.fromObject = function fromObject(object) {
            if (object instanceof $root.bar.Foo)
                return object;
            var message = new $root.bar.Foo();
            if (object.a != null)
                message.a = object.a >>> 0;
            if (object.b != null)
                message.b = String(object.b);
            return message;
        };

        /**
         * Creates a plain object from a Foo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bar.Foo
         * @static
         * @param {bar.Foo} message Foo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Foo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.a = 0;
                object.b = "";
            }
            if (message.a != null && message.hasOwnProperty("a"))
                object.a = message.a;
            if (message.b != null && message.hasOwnProperty("b"))
                object.b = message.b;
            return object;
        };

        /**
         * Converts this Foo to JSON.
         * @function toJSON
         * @memberof bar.Foo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Foo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Foo;
    })();

    bar.Bar = (function() {

        /**
         * Properties of a Bar.
         * @memberof bar
         * @interface IBar
         * @property {string|null} [a] Bar a
         * @property {number|null} [b] Bar b
         * @property {Array.<number>|null} [c] Bar c
         * @property {Array.<number>|null} [d] Bar d
         * @property {Array.<bar.IFoo>|null} [e] Bar e
         * @property {Array.<bar.IFoo>|null} [f] Bar f
         * @property {Object.<string,boolean>|null} [g] Bar g
         * @property {Object.<string,bar.IFoo>|null} [h] Bar h
         * @property {bar.IPuz} j Bar j
         */

        /**
         * Constructs a new Bar.
         * @memberof bar
         * @classdesc Represents a Bar.
         * @implements IBar
         * @constructor
         * @param {bar.IBar=} [properties] Properties to set
         */
        function Bar(properties) {
            this.c = [];
            this.d = [];
            this.e = [];
            this.f = [];
            this.g = {};
            this.h = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Bar a.
         * @member {string} a
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.a = "x";

        /**
         * Bar b.
         * @member {number} b
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.b = $util.Long ? $util.Long.fromBits(100,0,true) : 100;

        /**
         * Bar c.
         * @member {Array.<number>} c
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.c = $util.emptyArray;

        /**
         * Bar d.
         * @member {Array.<number>} d
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.d = $util.emptyArray;

        /**
         * Bar e.
         * @member {Array.<bar.IFoo>} e
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.e = $util.emptyArray;

        /**
         * Bar f.
         * @member {Array.<bar.IFoo>} f
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.f = $util.emptyArray;

        /**
         * Bar g.
         * @member {Object.<string,boolean>} g
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.g = $util.emptyObject;

        /**
         * Bar h.
         * @member {Object.<string,bar.IFoo>} h
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.h = $util.emptyObject;

        /**
         * Bar j.
         * @member {bar.IPuz} j
         * @memberof bar.Bar
         * @instance
         */
        Bar.prototype.j = null;

        /**
         * Creates a new Bar instance using the specified properties.
         * @function create
         * @memberof bar.Bar
         * @static
         * @param {bar.IBar=} [properties] Properties to set
         * @returns {bar.Bar} Bar instance
         */
        Bar.create = function create(properties) {
            return new Bar(properties);
        };

        /**
         * Encodes the specified Bar message. Does not implicitly {@link bar.Bar.verify|verify} messages.
         * @function encode
         * @memberof bar.Bar
         * @static
         * @param {bar.IBar} message Bar message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bar.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.a);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.b);
            if (message.c != null && message.c.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (var i = 0; i < message.c.length; ++i)
                    writer.uint32(message.c[i]);
                writer.ldelim();
            }
            if (message.d != null && message.d.length)
                for (var i = 0; i < message.d.length; ++i)
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.d[i]);
            if (message.e != null && message.e.length)
                for (var i = 0; i < message.e.length; ++i)
                    $root.bar.Foo.encode(message.e[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.f != null && message.f.length)
                for (var i = 0; i < message.f.length; ++i)
                    $root.bar.Foo.encode(message.f[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.g != null && Object.hasOwnProperty.call(message, "g"))
                for (var keys = Object.keys(message.g), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 7, wireType 2 =*/58).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).bool(message.g[keys[i]]).ldelim();
            if (message.h != null && Object.hasOwnProperty.call(message, "h"))
                for (var keys = Object.keys(message.h), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.bar.Foo.encode(message.h[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            $root.bar.Puz.encode(message.j, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Bar message, length delimited. Does not implicitly {@link bar.Bar.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bar.Bar
         * @static
         * @param {bar.IBar} message Bar message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bar.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Bar message from the specified reader or buffer.
         * @function decode
         * @memberof bar.Bar
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bar.Bar} Bar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bar.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bar.Bar(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.a = reader.string();
                    break;
                case 2:
                    message.b = reader.uint64();
                    break;
                case 3:
                    if (!(message.c && message.c.length))
                        message.c = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.c.push(reader.uint32());
                    } else
                        message.c.push(reader.uint32());
                    break;
                case 4:
                    if (!(message.d && message.d.length))
                        message.d = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.d.push(reader.uint32());
                    } else
                        message.d.push(reader.uint32());
                    break;
                case 5:
                    if (!(message.e && message.e.length))
                        message.e = [];
                    message.e.push($root.bar.Foo.decode(reader, reader.uint32()));
                    break;
                case 6:
                    if (!(message.f && message.f.length))
                        message.f = [];
                    message.f.push($root.bar.Foo.decode(reader, reader.uint32()));
                    break;
                case 7:
                    if (message.g === $util.emptyObject)
                        message.g = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = false;
                    while (reader.pos < end2) {
                        var tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.uint32();
                            break;
                        case 2:
                            value = reader.bool();
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.g[key] = value;
                    break;
                case 8:
                    if (message.h === $util.emptyObject)
                        message.h = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = "";
                    value = null;
                    while (reader.pos < end2) {
                        var tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.string();
                            break;
                        case 2:
                            value = $root.bar.Foo.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.h[key] = value;
                    break;
                case 10:
                    message.j = $root.bar.Puz.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("j"))
                throw $util.ProtocolError("missing required 'j'", { instance: message });
            return message;
        };

        /**
         * Decodes a Bar message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bar.Bar
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bar.Bar} Bar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bar.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Bar message.
         * @function verify
         * @memberof bar.Bar
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Bar.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.a != null && message.hasOwnProperty("a"))
                if (!$util.isString(message.a))
                    return "a: string expected";
            if (message.b != null && message.hasOwnProperty("b"))
                if (!$util.isInteger(message.b) && !(message.b && $util.isInteger(message.b.low) && $util.isInteger(message.b.high)))
                    return "b: integer|Long expected";
            if (message.c != null && message.hasOwnProperty("c")) {
                if (!Array.isArray(message.c))
                    return "c: array expected";
                for (var i = 0; i < message.c.length; ++i)
                    if (!$util.isInteger(message.c[i]))
                        return "c: integer[] expected";
            }
            if (message.d != null && message.hasOwnProperty("d")) {
                if (!Array.isArray(message.d))
                    return "d: array expected";
                for (var i = 0; i < message.d.length; ++i)
                    if (!$util.isInteger(message.d[i]))
                        return "d: integer[] expected";
            }
            if (message.e != null && message.hasOwnProperty("e")) {
                if (!Array.isArray(message.e))
                    return "e: array expected";
                for (var i = 0; i < message.e.length; ++i) {
                    var error = $root.bar.Foo.verify(message.e[i]);
                    if (error)
                        return "e." + error;
                }
            }
            if (message.f != null && message.hasOwnProperty("f")) {
                if (!Array.isArray(message.f))
                    return "f: array expected";
                for (var i = 0; i < message.f.length; ++i) {
                    var error = $root.bar.Foo.verify(message.f[i]);
                    if (error)
                        return "f." + error;
                }
            }
            if (message.g != null && message.hasOwnProperty("g")) {
                if (!$util.isObject(message.g))
                    return "g: object expected";
                var key = Object.keys(message.g);
                for (var i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i]))
                        return "g: integer key{k:uint32} expected";
                    if (typeof message.g[key[i]] !== "boolean")
                        return "g: boolean{k:uint32} expected";
                }
            }
            if (message.h != null && message.hasOwnProperty("h")) {
                if (!$util.isObject(message.h))
                    return "h: object expected";
                var key = Object.keys(message.h);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.bar.Foo.verify(message.h[key[i]]);
                    if (error)
                        return "h." + error;
                }
            }
            {
                var error = $root.bar.Puz.verify(message.j);
                if (error)
                    return "j." + error;
            }
            return null;
        };

        /**
         * Creates a Bar message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bar.Bar
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bar.Bar} Bar
         */
        Bar.fromObject = function fromObject(object) {
            if (object instanceof $root.bar.Bar)
                return object;
            var message = new $root.bar.Bar();
            if (object.a != null)
                message.a = String(object.a);
            if (object.b != null)
                if ($util.Long)
                    (message.b = $util.Long.fromValue(object.b)).unsigned = true;
                else if (typeof object.b === "string")
                    message.b = parseInt(object.b, 10);
                else if (typeof object.b === "number")
                    message.b = object.b;
                else if (typeof object.b === "object")
                    message.b = new $util.LongBits(object.b.low >>> 0, object.b.high >>> 0).toNumber(true);
            if (object.c) {
                if (!Array.isArray(object.c))
                    throw TypeError(".bar.Bar.c: array expected");
                message.c = [];
                for (var i = 0; i < object.c.length; ++i)
                    message.c[i] = object.c[i] >>> 0;
            }
            if (object.d) {
                if (!Array.isArray(object.d))
                    throw TypeError(".bar.Bar.d: array expected");
                message.d = [];
                for (var i = 0; i < object.d.length; ++i)
                    message.d[i] = object.d[i] >>> 0;
            }
            if (object.e) {
                if (!Array.isArray(object.e))
                    throw TypeError(".bar.Bar.e: array expected");
                message.e = [];
                for (var i = 0; i < object.e.length; ++i) {
                    if (typeof object.e[i] !== "object")
                        throw TypeError(".bar.Bar.e: object expected");
                    message.e[i] = $root.bar.Foo.fromObject(object.e[i]);
                }
            }
            if (object.f) {
                if (!Array.isArray(object.f))
                    throw TypeError(".bar.Bar.f: array expected");
                message.f = [];
                for (var i = 0; i < object.f.length; ++i) {
                    if (typeof object.f[i] !== "object")
                        throw TypeError(".bar.Bar.f: object expected");
                    message.f[i] = $root.bar.Foo.fromObject(object.f[i]);
                }
            }
            if (object.g) {
                if (typeof object.g !== "object")
                    throw TypeError(".bar.Bar.g: object expected");
                message.g = {};
                for (var keys = Object.keys(object.g), i = 0; i < keys.length; ++i)
                    message.g[keys[i]] = Boolean(object.g[keys[i]]);
            }
            if (object.h) {
                if (typeof object.h !== "object")
                    throw TypeError(".bar.Bar.h: object expected");
                message.h = {};
                for (var keys = Object.keys(object.h), i = 0; i < keys.length; ++i) {
                    if (typeof object.h[keys[i]] !== "object")
                        throw TypeError(".bar.Bar.h: object expected");
                    message.h[keys[i]] = $root.bar.Foo.fromObject(object.h[keys[i]]);
                }
            }
            if (object.j != null) {
                if (typeof object.j !== "object")
                    throw TypeError(".bar.Bar.j: object expected");
                message.j = $root.bar.Puz.fromObject(object.j);
            }
            return message;
        };

        /**
         * Creates a plain object from a Bar message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bar.Bar
         * @static
         * @param {bar.Bar} message Bar
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Bar.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.c = [];
                object.d = [];
                object.e = [];
                object.f = [];
            }
            if (options.objects || options.defaults) {
                object.g = {};
                object.h = {};
            }
            if (options.defaults) {
                object.a = "x";
                if ($util.Long) {
                    var long = new $util.Long(100, 0, true);
                    object.b = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.b = options.longs === String ? "100" : 100;
                object.j = null;
            }
            if (message.a != null && message.hasOwnProperty("a"))
                object.a = message.a;
            if (message.b != null && message.hasOwnProperty("b"))
                if (typeof message.b === "number")
                    object.b = options.longs === String ? String(message.b) : message.b;
                else
                    object.b = options.longs === String ? $util.Long.prototype.toString.call(message.b) : options.longs === Number ? new $util.LongBits(message.b.low >>> 0, message.b.high >>> 0).toNumber(true) : message.b;
            if (message.c && message.c.length) {
                object.c = [];
                for (var j = 0; j < message.c.length; ++j)
                    object.c[j] = message.c[j];
            }
            if (message.d && message.d.length) {
                object.d = [];
                for (var j = 0; j < message.d.length; ++j)
                    object.d[j] = message.d[j];
            }
            if (message.e && message.e.length) {
                object.e = [];
                for (var j = 0; j < message.e.length; ++j)
                    object.e[j] = $root.bar.Foo.toObject(message.e[j], options);
            }
            if (message.f && message.f.length) {
                object.f = [];
                for (var j = 0; j < message.f.length; ++j)
                    object.f[j] = $root.bar.Foo.toObject(message.f[j], options);
            }
            var keys2;
            if (message.g && (keys2 = Object.keys(message.g)).length) {
                object.g = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.g[keys2[j]] = message.g[keys2[j]];
            }
            if (message.h && (keys2 = Object.keys(message.h)).length) {
                object.h = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.h[keys2[j]] = $root.bar.Foo.toObject(message.h[keys2[j]], options);
            }
            if (message.j != null && message.hasOwnProperty("j"))
                object.j = $root.bar.Puz.toObject(message.j, options);
            return object;
        };

        /**
         * Converts this Bar to JSON.
         * @function toJSON
         * @memberof bar.Bar
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Bar.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Bar;
    })();

    bar.Puz = (function() {

        /**
         * Properties of a Puz.
         * @memberof bar
         * @interface IPuz
         * @property {number|null} [a] Puz a
         * @property {string|null} [b] Puz b
         * @property {Array.<string>|null} [c] Puz c
         */

        /**
         * Constructs a new Puz.
         * @memberof bar
         * @classdesc Represents a Puz.
         * @implements IPuz
         * @constructor
         * @param {bar.IPuz=} [properties] Properties to set
         */
        function Puz(properties) {
            this.c = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Puz a.
         * @member {number} a
         * @memberof bar.Puz
         * @instance
         */
        Puz.prototype.a = 0;

        /**
         * Puz b.
         * @member {string} b
         * @memberof bar.Puz
         * @instance
         */
        Puz.prototype.b = "";

        /**
         * Puz c.
         * @member {Array.<string>} c
         * @memberof bar.Puz
         * @instance
         */
        Puz.prototype.c = $util.emptyArray;

        /**
         * Creates a new Puz instance using the specified properties.
         * @function create
         * @memberof bar.Puz
         * @static
         * @param {bar.IPuz=} [properties] Properties to set
         * @returns {bar.Puz} Puz instance
         */
        Puz.create = function create(properties) {
            return new Puz(properties);
        };

        /**
         * Encodes the specified Puz message. Does not implicitly {@link bar.Puz.verify|verify} messages.
         * @function encode
         * @memberof bar.Puz
         * @static
         * @param {bar.IPuz} message Puz message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Puz.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.a);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.b);
            if (message.c != null && message.c.length)
                for (var i = 0; i < message.c.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.c[i]);
            return writer;
        };

        /**
         * Encodes the specified Puz message, length delimited. Does not implicitly {@link bar.Puz.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bar.Puz
         * @static
         * @param {bar.IPuz} message Puz message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Puz.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Puz message from the specified reader or buffer.
         * @function decode
         * @memberof bar.Puz
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bar.Puz} Puz
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Puz.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bar.Puz();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.a = reader.uint32();
                    break;
                case 2:
                    message.b = reader.string();
                    break;
                case 3:
                    if (!(message.c && message.c.length))
                        message.c = [];
                    message.c.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Puz message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof bar.Puz
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bar.Puz} Puz
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Puz.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Puz message.
         * @function verify
         * @memberof bar.Puz
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Puz.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.a != null && message.hasOwnProperty("a"))
                if (!$util.isInteger(message.a))
                    return "a: integer expected";
            if (message.b != null && message.hasOwnProperty("b"))
                if (!$util.isString(message.b))
                    return "b: string expected";
            if (message.c != null && message.hasOwnProperty("c")) {
                if (!Array.isArray(message.c))
                    return "c: array expected";
                for (var i = 0; i < message.c.length; ++i)
                    if (!$util.isString(message.c[i]))
                        return "c: string[] expected";
            }
            return null;
        };

        /**
         * Creates a Puz message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bar.Puz
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bar.Puz} Puz
         */
        Puz.fromObject = function fromObject(object) {
            if (object instanceof $root.bar.Puz)
                return object;
            var message = new $root.bar.Puz();
            if (object.a != null)
                message.a = object.a >>> 0;
            if (object.b != null)
                message.b = String(object.b);
            if (object.c) {
                if (!Array.isArray(object.c))
                    throw TypeError(".bar.Puz.c: array expected");
                message.c = [];
                for (var i = 0; i < object.c.length; ++i)
                    message.c[i] = String(object.c[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a Puz message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bar.Puz
         * @static
         * @param {bar.Puz} message Puz
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Puz.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.c = [];
            if (options.defaults) {
                object.a = 0;
                object.b = "";
            }
            if (message.a != null && message.hasOwnProperty("a"))
                object.a = message.a;
            if (message.b != null && message.hasOwnProperty("b"))
                object.b = message.b;
            if (message.c && message.c.length) {
                object.c = [];
                for (var j = 0; j < message.c.length; ++j)
                    object.c[j] = message.c[j];
            }
            return object;
        };

        /**
         * Converts this Puz to JSON.
         * @function toJSON
         * @memberof bar.Puz
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Puz.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Puz;
    })();

    return bar;
})();