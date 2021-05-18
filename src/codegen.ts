/*
 * Copyright (c) 2021, Irvin Pang <halo.irvin@gmail.com>
 * All rights reserved.
 * 
 * licensed under the MIT License
 */

export class SimpleCodeGen {
    private _lines: string[];
    private _indentCount: number;
    private _indentStyle: string;

    constructor(style: string | number = 2) {
        this._lines = [];
        this._indentCount = 0;
        if (typeof style === 'number') {
            this._indentStyle = ' '.repeat(style);
        } else {
            this._indentStyle = style;
        }
    }

    public addIndent(): SimpleCodeGen {
        this._indentCount ++;
        return this;
    }

    public subIndent(): SimpleCodeGen {
        this._indentCount --;
        return this;
    }

    public pushLine(line: string = '', ...values: any[]): SimpleCodeGen {
        if (line) {
            let counter = 0;
            line = line.replace(/%([%dfsj])/g, (_, $1) => {
                let value = values[counter ++];
                switch ($1) {
                    case 'd': case 'f': return String(Number(value));
                    case 's': return String(value);
                    case 'j': return JSON.stringify(value);
                }
                return '%';
            });
            if (counter !== values.length) {
                throw new Error(`"${line}": arguments' count not matching!`);
            }
            this._lines.push(`${this._indentStyle.repeat(this._indentCount)}${line}`);
        } else {
            this._lines.push('');
        }
        return this;
    }

    public pushComments(lines: string[]): SimpleCodeGen {
        let split: string[] = [];
        for (let i = 0; i < lines.length; ++ i) {
            split.push(...lines[i].split(/\r?\n/g));
        }
        this.pushLine('/**');
        split.forEach((line) => {
            if (line === null) return;
            this.pushLine(` * ${line.replace(/\*\//g, '* /')}`);
        });
        return this.pushLine(' */');
    }

    public quote(s: any): any {
        if (Array.isArray(s)) {
            return `[${s.map(e => this.quote(e)).join(', ')}]`;
        }
        return typeof s === 'string' ? `'${s}'` : String(s);
    }

    public toString(): string {
        return this._lines.join('\n');
    }
}