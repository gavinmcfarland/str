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
		this.opts.external = opts.external || '';
	}
	append(strings, ...values) {
		__classPrivateFieldGet(this, _Str_instances, "m", _Str_processStrings).call(this, strings, values, false); // false indicates appending
		return this;
	}
	prepend(strings, ...values) {
		// If starts with initial string, remove
		// let removedInitialString
		if (this.opts.external && this.initialString) {
			if (this.opts.external.startsWith(this.initialString)) {
				// removedInitialString = true
				this.opts.external = this.opts.external.slice(this.initialString.length);
			}
		}
		__classPrivateFieldGet(this, _Str_instances, "m", _Str_processStrings).call(this, strings, values, true); // true indicates prepending
		// Re-apply initial string
		if (this.initialString) {
			this.opts.external = this.initialString + this.opts.external;
		}
		return this;
	}
	get output() {
		var _a;
		return __classPrivateFieldGet(this, _Str_instances, "m", _Str_trimTrailingNewLine).call(this, (_a = this.opts.external) !== null && _a !== void 0 ? _a : '');
	}
	get() {
		var _a;
		return __classPrivateFieldGet(this, _Str_instances, "m", _Str_trimTrailingNewLine).call(this, (_a = this.opts.external) !== null && _a !== void 0 ? _a : '');
	}
}
_Str_instances = new WeakSet(), _Str_processStrings = function _Str_processStrings(strings, values, isPrepend) {
	if (Array.isArray(strings)) {
		let str = '';
		// Re-apply initial string
		if (!isPrepend) {
			if (this.initialString && !this.opts.external) {
				str = this.initialString + str;
			}
		}
		if (!this.opts.inline && !isPrepend && this.opts.external) {
			str = str + '\n';
		}
		let str2 = '';
		strings.forEach((string, a) => {
			// If string starts with a new line, remove it
			if (a === 0) {
				string = string.replace(/^\n+/, '');
			}
			if (values[a] === 0)
				values[a] = values[a].toString();
			str2 += string + (values[a] || '');
		});
		str = str + __classPrivateFieldGet(this, _Str_instances, "m", _Str_removeExcessIndent).call(this, str2);
		// str = str + str2
		if (!this.opts.inline && isPrepend && this.opts.external) {
			str = str + '\n';
		}
		if (isPrepend) {
			str = str + this.opts.external;
		}
		else {
			str = this.opts.external + str;
		}
		this.opts.external = str;
	}
}, _Str_removeExcessIndent = function _Str_removeExcessIndent(str) {
	// Remove trailing white space
	str = str.replace(/\n\s*$/, '');
	const lines = str.split('\n');
	// Remove white space from first line if more than 1 line
	if (lines.length > 1) {
		lines[0] = lines[0].trim();
	}
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
}, _Str_trimTrailingNewLine = function _Str_trimTrailingNewLine(str) {
	return str.replace(/\n\s*$/, '');
};
