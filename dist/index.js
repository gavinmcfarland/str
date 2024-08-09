var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Test_instances, _Test_processStrings, _Test_removeExcessIndent;
export class Test {
    constructor(string, opts) {
        _Test_instances.add(this);
        this.output = string || '';
        this.opts = opts;
        this.initialString = string;
        return this;
    }
    append(strings, ...values) {
        __classPrivateFieldGet(this, _Test_instances, "m", _Test_processStrings).call(this, strings, values, false); // false indicates appending
        return this;
    }
    prepend(strings, ...values) {
        // Remove the initial string from the output before prepending
        if (this.initialString &&
            this.output.startsWith(this.initialString)) {
            this.output = this.output.slice(this.initialString.length);
        }
        __classPrivateFieldGet(this, _Test_instances, "m", _Test_processStrings).call(this, strings, values, true); // true indicates prepending
        // Then re-apply it so it's at the start of the string
        this.output = this.initialString + this.output;
        return this;
    }
    get() {
        return this.output;
    }
}
_Test_instances = new WeakSet(), _Test_processStrings = function _Test_processStrings(strings, values, isPrepend) {
    if (Array.isArray(strings)) {
        let str = '';
        strings.forEach((string, a) => {
            var _a;
            if (values[a] === 0)
                values[a] = values[a].toString();
            str += string + (values[a] || '');
            let nextToArg = a < strings.length - 1;
            if (!((_a = this.opts) === null || _a === void 0 ? void 0 : _a.inline) && !nextToArg) {
                str += '\n';
            }
        });
        str = __classPrivateFieldGet(this, _Test_instances, "m", _Test_removeExcessIndent).call(this, str);
        if (isPrepend) {
            this.output = str + this.output; // Prepend the processed string
        }
        else {
            this.output += str; // Append the processed string
        }
    }
}, _Test_removeExcessIndent = function _Test_removeExcessIndent(str) {
    const lines = str.split('\n');
    // Find the minimum indentation of non-empty lines (excluding the first line)
    const minIndent = lines
        .slice(1) // Skip the first line
        .filter((line) => line.trim().length > 0) // Exclude empty lines
        .reduce((min, line) => {
        var _a;
        const leadingWhitespace = ((_a = line.match(/^\s*/)) === null || _a === void 0 ? void 0 : _a[0].length) || 0;
        return Math.min(min, leadingWhitespace);
    }, Infinity);
    if (minIndent === Infinity)
        return str; // In case all lines are empty or it's a single-line string
    // Remove the minimum indentation from all lines except the first
    const adjustedLines = lines.map((line, index) => {
        if (index === 0)
            return line; // Keep the first line as is
        return line.slice(minIndent); // Remove the excess indent from other lines
    });
    return adjustedLines.join('\n');
};
let str = new Test('@');
let thing = 'yoooo';
let second = 'asasas';
// prettier-ignore
str.append `:where(html) {`
    .append `	--font-size-1: ${thing} ${second};`
    .append `	--font-size-2: sasas;`
    .append `}`
    .prepend `div {
				test
				test
			}`;
console.log(str.output);
