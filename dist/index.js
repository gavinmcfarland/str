var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Str_instances, _Str_processStrings, _Str_removeExcessIndent, _Str_trimTrailingNewLine;
export class Str {
    constructor(start, opts = {}) {
        _Str_instances.add(this);
        this.opts = opts;
        this.initialString = start;
        this.internalOutput = start || '';
        if (this.opts.output !== undefined) {
            this.opts.output = this.internalOutput;
        }
    }
    append(strings, ...values) {
        __classPrivateFieldGet(this, _Str_instances, "m", _Str_processStrings).call(this, strings, values, false); // false indicates appending
        return this;
    }
    prepend(strings, ...values) {
        if (this.initialString && this.output.startsWith(this.initialString)) {
            this.internalOutput = this.internalOutput.slice(this.initialString.length);
            if (this.opts.output !== undefined) {
                this.opts.output = this.opts.output.slice(this.initialString.length);
            }
        }
        __classPrivateFieldGet(this, _Str_instances, "m", _Str_processStrings).call(this, strings, values, true); // true indicates prepending
        this.internalOutput = this.initialString + this.internalOutput;
        if (this.opts.output !== undefined) {
            this.opts.output = this.initialString + this.opts.output;
        }
        return this;
    }
    get output() {
        var _a;
        return __classPrivateFieldGet(this, _Str_instances, "m", _Str_trimTrailingNewLine).call(this, (_a = this.opts.output) !== null && _a !== void 0 ? _a : this.internalOutput);
    }
    get() {
        var _a;
        return __classPrivateFieldGet(this, _Str_instances, "m", _Str_trimTrailingNewLine).call(this, (_a = this.opts.output) !== null && _a !== void 0 ? _a : this.internalOutput);
    }
}
_Str_instances = new WeakSet(), _Str_processStrings = function _Str_processStrings(strings, values, isPrepend) {
    if (Array.isArray(strings)) {
        let str = '';
        strings.forEach((string, a) => {
            if (values[a] === 0)
                values[a] = values[a].toString();
            str += string + (values[a] || '');
            let nextToArg = a < strings.length - 1;
            if (!this.opts.inline && !nextToArg) {
                str += '\n';
            }
        });
        str = __classPrivateFieldGet(this, _Str_instances, "m", _Str_removeExcessIndent).call(this, str);
        if (isPrepend) {
            this.internalOutput = str + this.internalOutput;
            if (this.opts.output !== undefined) {
                this.opts.output = str + this.opts.output;
            }
        }
        else {
            this.internalOutput += str;
            if (this.opts.output !== undefined) {
                this.opts.output += str;
            }
        }
    }
}, _Str_removeExcessIndent = function _Str_removeExcessIndent(str) {
    const lines = str.split('\n');
    const minIndent = lines
        .slice(1)
        .filter((line) => line.trim().length > 0)
        .reduce((min, line) => {
        var _a;
        const leadingWhitespace = ((_a = line.match(/^\s*/)) === null || _a === void 0 ? void 0 : _a[0].length) || 0;
        return Math.min(min, leadingWhitespace);
    }, Infinity);
    if (minIndent === Infinity)
        return str;
    const adjustedLines = lines.map((line, index) => {
        if (index === 0)
            return line;
        return line.slice(minIndent);
    });
    return adjustedLines.join('\n');
}, _Str_trimTrailingNewLine = function _Str_trimTrailingNewLine(str) {
    return str.replace(/\n\s*$/, '');
};
let opts = { output: '' };
let str = new Str('@', opts);
str.append `Test`.append `what`.prepend `check`;
console.log(str.get()); // This will output "Test"
