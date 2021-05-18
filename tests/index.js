'use strict';

var path = require('path'),
    cli  = require(path.join(__dirname, '..', 'cli', 'index.js'));

exports.TestCase = /** @class */ (function () {
    function TestCase(name, protofiles) {
        this._case = name;
        this._protofiles = protofiles;
        this._case && (this._workdir = path.join(__dirname, this._case));
        this._case && (this._bundlesName = 'protobuf-bundles-' + this._case);
    }

    // configurate with local installed library
    // kind = ['full'(default)|'light'|'minimal']
    TestCase.prototype.loadLibrary = function (kind) {
        // protobuf library
        var dirname = (kind === 'full' || !kind) ? '' : kind;
        var protobuf = require(path.join(__dirname, '..', 'node_modules', 'protobufjs', 'dist', dirname, 'protobuf.js'));
        global.protobuf = global.$protobuf = protobuf;
        // for 'Long' implement
        if (!protobuf.util.Long) {
            protobuf.util.Long = require(path.join(__dirname, '..', 'node_modules', 'long'));
        }
        return protobuf;
    }

    TestCase.prototype.generate = function(options) {
        var args = [ '--root', this._case, '--out', this._workdir, '--name', this._bundlesName, '--path', this._workdir ];
        if (options) {
            // replace options
            while (options.length) {
                if (options[0][0] === '-') {
                    var opt = options.splice(0, 1)[0];
                    var optIndex = args.indexOf(opt);
                    if (options[0] && options[0][0] !== '-') {
                        if (optIndex < 0) {
                            args.push(opt);
                            args.push(options.splice(0, 1)[0]);
                        } else {
                            args[optIndex + 1] = options.splice(0, 1)[0];
                        }
                    } else {
                        optIndex < 0 && args.push(opt);
                    }
                }
            }
        }
        args = args.concat(this._protofiles);
        return cli.main(args);
    }

    TestCase.prototype.requireBundles = function() {
        require(path.join(this._workdir, this._bundlesName));
    }

    TestCase.prototype.unrequireBundles = function() {
        delete require.cache[path.join(this._workdir, this._bundlesName) + '.js'];
        delete global.protobuf.roots[this._case];
        delete global[this._case];
    }

    return TestCase;
}());
