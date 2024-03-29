/*
 * Copyright (c) 2022, Irvin Pang <halo.irvin@gmail.com>
 * All rights reserved.
 * 
 * licensed under the MIT License
 */

import protobuf from 'protobufjs';
import IOptions from './options';
import SimpleCodeGen from './codegen';
import RootVisitor from './root-visitor';

const PACKAGE: any = require('../package.json');

class DtsWriter extends RootVisitor {
    protected static IMPORT_PB_AS = '$protobuf';
    protected static NUMBERIC_LONG_ARR = [ 'int64', 'sint64', 'fixed64', 'sfixed64', 'uint64' ];
    protected static NUMBERIC_NUMBER_ARR = [ 'int32', 'sint32', 'fixed32', 'sfixed32', 'uint32', 'float', 'double' ];

    protected _config: IOptions;
    protected _codeGen: SimpleCodeGen;

    public constructor(config: IOptions) {
        super();
        this._config = config;
        this._codeGen = new SimpleCodeGen(4);
    }

    public dump(): string {
        return this._codeGen.toString();
    }

    protected _toJsType(fieldType: string): string {
        if (DtsWriter.NUMBERIC_LONG_ARR.includes(fieldType)) {
            return 'number|Long';
        } else if (DtsWriter.NUMBERIC_NUMBER_ARR.includes(fieldType)) {
            return 'number';
        } else if (fieldType === 'bool') {
            return 'boolean';
        } else if (fieldType === 'bytes') {
            return 'Uint8Array';
        }
        return fieldType;
    }

    protected _toInterfaceName(type: protobuf.ReflectionObject): string {
        return `I${type.name}`;
    }

    protected _toFullInterfaceName(type: protobuf.ReflectionObject): string {
        let interfaceName = this._toInterfaceName(type);
        return type.parent ? `${type.parent.fullName}.${interfaceName}` : interfaceName;
    }

    protected _onEnterRoot(root: protobuf.Root): void {
        // auto-generated hint
        this._codeGen
            .pushComments([
                "DO NOT EDIT",
                `-- this file is generated by ${PACKAGE.name} v${PACKAGE.version}`,
                `-- reporting issues on ${PACKAGE.bugs.url}`,
            ])
            .pushLine();

        // import protobuf
        this._codeGen
            .pushComments([
                "change the following import statement by option [--library <path>].",
                "<path> could be one of the protobufjs' distribution types: 'full'(default), 'light', or 'minimal'.",
                "besides, it could be the specified location of any 'protobuf-library.js' you wanna be."
            ])
            .pushLine("import * as %s from '%s';", DtsWriter.IMPORT_PB_AS, (<any>global)['$minipbjs_libpath'])
            .pushLine();
    }

    protected _onExitRoot(root: protobuf.Root): void {
        this._codeGen
            .pushLine()
            .pushLine("export default %s;", root.name);
    }

    protected _onEnterNested(ns: protobuf.NamespaceBase, isLastOne: boolean): void {
        this._codeGen
            .pushComments([ `Namespace ${ns.name}.` ])
            .pushLine("declare module %s {", ns.name).addIndent()
            .pushLine();
    }

    protected _onExitNested(ns: protobuf.NamespaceBase, isLastOne: boolean): void {
        this._codeGen.subIndent().pushLine("} /* end of %s */", ns.name).pushLine();
    }

    protected _onEnterType(type: protobuf.Type, isLastOne: boolean): void {
        // iterates all fields
        let fieldTypes = [];
        const fieldIds = Object.keys(type.fieldsById).map(id => parseInt(id));
        for (let id of fieldIds) {
            let field = type.fieldsById[id];
            let fieldType = field.resolvedType ? field.resolvedType.fullName : field.type;
            let jsType = "";
            if (field.map) {
                // map field is marked by a heading '{',
                // follows with the comma delimited keyType and valueType
                const mapField: protobuf.MapField = <any>field;
                jsType = `{ [k: ${this._toJsType(mapField.keyType)}]: ${this._toJsType(fieldType)} }`;
            } else if (field.repeated) {
                // repeated field is marked by a heading '[', or '<' if packed
                jsType = `${this._toJsType(fieldType)}[]`;
            } else {
                jsType = this._toJsType(fieldType);
            }
            fieldTypes.push([ field.id, field.name, jsType ]);
        }

        // -- interface
        const interfaceName = this._toInterfaceName(type);
        this._codeGen
            .pushComments([ `Properties of ${type.name}.` ])
            .pushLine("interface %s {", interfaceName).addIndent();
        // -- interface -- fields
        if (fieldTypes.length) this._codeGen.pushLine();
        for (let fieldType of fieldTypes) {
            this._codeGen
                .pushComments([ `id.${fieldType[0]} ${type.name} ${fieldType[1]}` ])
                .pushLine("%s?: (%s|null);", fieldType[1], fieldType[2])
                .pushLine();
        }
        // end of interface
        this._codeGen.subIndent().pushLine("}").pushLine()

        // -- class
        this._codeGen
            .pushComments([ `Representation of ${type.name}.` ])
            .pushLine("class %s implements I%s {", type.name, type.name).addIndent().pushLine();
        // -- class -- constructor
        this._codeGen
            .pushComments([
                `Constructs a new ${type.name}.`,
                "@param [properties] Properties to set" ])
            .pushLine("constructor(properties?: %s);", interfaceName).pushLine();
        // -- class -- fields
        for (let fieldType of fieldTypes) {
            this._codeGen
                .pushComments([ `id.${fieldType[0]} ${type.name} ${fieldType[1]}` ])
                .pushLine("public %s: %s;", fieldType[1], fieldType[2])
                .pushLine()
        }
        // -- class -- create
        if (this._config.create) {
            this._codeGen
                .pushComments([
                    `Creates a new ${type.name} instance using the specified properties.`,
                    "@param [properties] Properties to set",
                    `@returns ${type.name} instance`
                ])
                .pushLine("public static create(properties?: %s): %s;", interfaceName, type.name)
                .pushLine();
        }

        // -- class -- encode / encodeDelimited
        if (this._config.encode) {
            this._codeGen
                .pushComments([
                    `Encodes the specified ${type.name} message. Does not implicitly {@link ${type.name}.verify|verify} messages.`,
                    `@param message ${type.name} message or plain object to encode`,
                    "@param [writer] Writer to encode to",
                    "@returns Writer"
                ])
                .pushLine("public static encode(message: %s, writer?: %s.Writer): %s.Writer;", interfaceName, DtsWriter.IMPORT_PB_AS, DtsWriter.IMPORT_PB_AS)
                .pushLine();
        
            if (this._config.delimited) {
                this._codeGen
                    .pushComments([
                        `Encodes the specified ${type.name} message, length delimited. Does not implicitly {@link ${type.name}.verify|verify} messages.`,
                        `@param message ${type.name} message or plain object to encode`,
                        "@param [writer] Writer to encode to",
                        "@returns Writer"
                    ])
                    .pushLine("public static encodeDelimited(message: %s, writer?: %s.Writer): %s.Writer;", interfaceName, DtsWriter.IMPORT_PB_AS, DtsWriter.IMPORT_PB_AS)
                    .pushLine();
            }
        }
        // -- class -- decode / decodeDelimited
        if (this._config.decode) {
            this._codeGen
                .pushComments([
                    `Decodes a ${type.name} message from the specified reader or buffer.`,
                    "@param reader Reader or buffer to decode from",
                    "@param [length] Message length if known beforehand",
                    `@returns ${type.name}`,
                    "@throws {Error} If the payload is not a reader or valid buffer",
                    `@throws {${DtsWriter.IMPORT_PB_AS}.util.ProtocolError} If required fields are missing`
                ])
                .pushLine("public static decode(reader: (%s.Reader|Uint8Array), length?: number): %s;", DtsWriter.IMPORT_PB_AS, type.name)
                .pushLine();
            if (this._config.delimited) {
                this._codeGen
                    .pushComments([
                        `Decodes a ${type.name} message from the specified reader or buffer, length delimited.`,
                        "@param reader Reader or buffer to decode from",
                        `@returns ${type.name}`,
                        "@throws {Error} If the payload is not a reader or valid buffer",
                        `@throws {${DtsWriter.IMPORT_PB_AS}.util.ProtocolError} If required fields are missing`
                    ])
                    .pushLine("public static decodeDelimited(reader: (%s.Reader|Uint8Array)): %s;", DtsWriter.IMPORT_PB_AS, type.name)
                    .pushLine();
            }
        }
        // -- class -- verify
        if (this._config.verify) {
            this._codeGen
                .pushComments([
                    `Verifies a ${type.name} message.`,
                    "@param message Plain object to verify",
                    "@returns `null` if valid, otherwise the reason why it is not"
                ])
                .pushLine("public static verify(message: { [k: string]: any }): (string|null);")
                .pushLine();
        }
        if (this._config.convert) {
            // -- class -- fromObject
            this._codeGen
                .pushComments([
                    `Creates a ${type.name} message from a plain object. Also converts values to their respective internal types.`,
                    "@param object Plain object",
                    `@returns ${type.name}`
                ])
                .pushLine("public static fromObject(object: { [k: string]: any }): %s;", type.name)
                .pushLine();
            // -- class -- toObject
            this._codeGen
                .pushComments([
                    `Creates a plain object from a ${type.name} message. Also converts values to other types if specified.`,
                    `@param message ${type.name}`,
                    "@param [options] Conversion options",
                    "@returns Plain object"
                ])
                .pushLine("public static toObject(message: %s, options?: %s.IConversionOptions): { [k: string]: any };", type.name, DtsWriter.IMPORT_PB_AS)
                .pushLine();
            
            // -- class -- toJSON
            this._codeGen
                .pushComments([
                    `Converts this ${type.name} to JSON.`,
                    "@returns JSON object"
                ])
                .pushLine("public toJSON(): { [k: string]: any };")
                .pushLine();
        }
        // end of class
        this._codeGen.subIndent().pushLine("}").pushLine();
    }

    protected _onEnterService(service: protobuf.Service, isLastOne: boolean): void {
        // -- service
        this._codeGen
            .pushComments([ `Represents a ${service.name}` ])
            .pushLine("class %s extends %s.rpc.Service {", service.name, DtsWriter.IMPORT_PB_AS).addIndent();
        // -- service -- constructor
        this._codeGen
            .pushComments([
                `Constructs a new ${service.name} Service.`,
                "@param rpcImpl RPC implementation",
                "@param [requestDelimited=false] Whether requests are length-delimited",
                "@param [responseDelimited=false] Whether responses are length-delimited"
            ])
            .pushLine("constructor(rpcImpl: %s.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);", DtsWriter.IMPORT_PB_AS)
            .pushLine();
        // -- service -- create
        if (this._config.create) {
            this._codeGen
                .pushComments([
                    `Creates new ${service.name} service using the specified rpc implementation.`,
                    "@param rpcImpl RPC implementation",
                    "@param [requestDelimited=false] Whether requests are length-delimited",
                    "@param [responseDelimited=false] Whether responses are length-delimited",
                    "@returns RPC service. Useful where requests and/or responses are streamed."
                ])
                .pushLine("public static create(rpcImpl: %s.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): %s;", DtsWriter.IMPORT_PB_AS, service.name)
                .pushLine();
        }
        // -- service -- methods('RPC' type only)
        let nodeStyledCallbacks = [];
        for (let method of Object.values(service.methods)) {
            if (method.type === 'rpc') {
                // resolve first
                method.resolve();
                if (!method.resolvedRequestType) {
                    console.error(`unable to resolve request type "${method.requestType}"`);
                    continue;
                }
                if (!method.resolvedResponseType) {
                    console.error(`unable to resolve response type "${method.responseType}"`);
                    continue;
                }
                // nodejs-styled callback
                this._codeGen
                    .pushComments([
                        `Calls ${method.name}.`,
                        `@param request ${method.resolvedRequestType.name} message or plain object`,
                        `@param callback Node-style callback called with the error, if any, and ${method.resolvedResponseType.name}`
                    ])
                    .pushLine("public %s(request: %s, callback: %sCallback): void;", method.name, method.resolvedRequestType.fullName, method.fullName)
                    .pushLine();

                nodeStyledCallbacks.push([ method.name, method.resolvedResponseType.fullName ]);

                // promisify-styled
                this._codeGen
                    .pushComments([
                        `Calls ${method.name}.`,
                        `@param request ${method.resolvedRequestType.name} message or plain object`,
                        "@returns Promise"
                    ])
                    .pushLine("public %s(request: %s): Promise<%s>;", method.name, method.resolvedRequestType.fullName, method.resolvedResponseType.fullName)
                    .pushLine();
            } else {
                console.warn(`method ${service.fullName}.${method.name} of type '${method.type}' is not support yet.`);
            }
        }
        // end of Service
        this._codeGen.subIndent().pushLine("}").pushLine();

        // -- service -- callbacks(nodejs-styled)
        if (nodeStyledCallbacks.length) {
            this._codeGen
                .pushLine("namespace %s {", service.name).addIndent()
                .pushLine();

            for (let callback of nodeStyledCallbacks) {
                this._codeGen
                    .pushComments([
                        `Callback as used by {@link ${service.fullName}#${callback[0]}}.`,
                        "@param error Error, if any",
                        `@param [response] ${callback[1]}`
                    ])
                    .pushLine("type %sCallback = (error: (Error|null), response?: %s) => void;", callback[0], callback[1])
                    .pushLine();
            }
            // end of callbacks
            this._codeGen.subIndent().pushLine("}").pushLine();
        }
    }

    protected _onEnterEnum(e: protobuf.Enum, isLastOne: boolean): void {
        this._codeGen
            .pushComments([ `${e.name} enum.` ])
            .pushLine("enum %s {", e.name).addIndent();
        let keyValues: any[] = [];
        for (let k in e.values) {
            // contains both key-num and num-key,
            // but we only need key-num.
            if (isNaN(parseInt(k))) keyValues.push([k, e.values[k]]);
        }
        // kill tailing ','
        for (let i = 0; i < keyValues.length; i ++) {
            this._codeGen.pushLine("%s = %d%s", keyValues[i][0], keyValues[i][1], i < keyValues.length - 1 ? ',' : '');
        }
        this._codeGen.subIndent().pushLine("}");
    }
}

function static_dts(root: protobuf.Root, options: IOptions, callback: Function): void {
    if (options.forceLong && !protobuf.util.Long) {
        throw new Error(`protobuf.util.Long is not available while '--force-long' option is specified`);
    }
    root.name = root.name || options.root || PACKAGE.name;
    let writer = new DtsWriter(options);
    writer.exclude = (<any>global)['$minipbjs_exclude'];
    writer.visit(root);
    callback(null, writer.dump());
}

module.exports = static_dts;
