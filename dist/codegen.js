"use strict";
/*
 * Copyright (c) 2021, Irvin Pang <halo.irvin@gmail.com>
 * All rights reserved.
 *
 * see LICENSE file for details
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCodeGen = void 0;
var SimpleCodeGen = /** @class */ (function () {
    function SimpleCodeGen(style) {
        if (style === void 0) { style = 2; }
        this._lines = [];
        this._indentCount = 0;
        if (typeof style === 'number') {
            this._indentStyle = ' '.repeat(style);
        }
        else {
            this._indentStyle = style;
        }
    }
    SimpleCodeGen.prototype.addIndent = function () {
        this._indentCount++;
        return this;
    };
    SimpleCodeGen.prototype.subIndent = function () {
        this._indentCount--;
        return this;
    };
    SimpleCodeGen.prototype.pushLine = function (line) {
        if (line === void 0) { line = ''; }
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        if (line) {
            var counter_1 = 0;
            line = line.replace(/%([%dfsj])/g, function (_, $1) {
                var value = values[counter_1++];
                switch ($1) {
                    case 'd':
                    case 'f': return String(Number(value));
                    case 's': return String(value);
                    case 'j': return JSON.stringify(value);
                }
                return '%';
            });
            if (counter_1 !== values.length) {
                throw new Error("\"" + line + "\": arguments' count not matching!");
            }
            this._lines.push("" + this._indentStyle.repeat(this._indentCount) + line);
        }
        else {
            this._lines.push('');
        }
        return this;
    };
    SimpleCodeGen.prototype.pushComments = function (lines) {
        var _this = this;
        var split = [];
        for (var i = 0; i < lines.length; ++i) {
            split.push.apply(split, lines[i].split(/\r?\n/g));
        }
        this.pushLine('/**');
        split.forEach(function (line) {
            if (line === null)
                return;
            _this.pushLine(" * " + line.replace(/\*\//g, '* /'));
        });
        return this.pushLine(' */');
    };
    SimpleCodeGen.prototype.quote = function (s) {
        var _this = this;
        if (Array.isArray(s)) {
            return "[" + s.map(function (e) { return _this.quote(e); }).join(', ') + "]";
        }
        return typeof s === 'string' ? "'" + s + "'" : String(s);
    };
    SimpleCodeGen.prototype.toString = function () {
        return this._lines.join('\n');
    };
    return SimpleCodeGen;
}());
exports.SimpleCodeGen = SimpleCodeGen;
//# sourceMappingURL=codegen.js.map