interface Opts {
	inline?: boolean
	external?: string
}

export class Str {
	private opts: Opts
	private internalOutput: string
	private initialString?: string

	constructor(start?: string, opts: Opts = {}) {
		this.opts = opts
		this.initialString = start
		this.internalOutput = start || ''

		if (this.opts.external !== undefined) {
			this.opts.external = this.internalOutput
		}
	}

	append(strings: TemplateStringsArray, ...values: any) {
		this.#processStrings(strings, values, false) // false indicates appending
		return this
	}

	prepend(strings: TemplateStringsArray, ...values: any) {
		if (this.initialString && this.output.startsWith(this.initialString)) {
			this.internalOutput = this.internalOutput.slice(this.initialString.length)
			if (this.opts.external !== undefined) {
				this.opts.external = this.opts.external.slice(this.initialString.length)
			}
		}

		this.#processStrings(strings, values, true) // true indicates prepending

		this.internalOutput = this.initialString + this.internalOutput
		if (this.opts.external !== undefined) {
			this.opts.external = this.initialString + this.opts.external
		}

		return this
	}

	get output() {
		return this.#trimTrailingNewLine(this.opts.external ?? this.internalOutput)
	}

	get() {
		return this.#trimTrailingNewLine(this.opts.external ?? this.internalOutput)
	}

	#processStrings(strings: TemplateStringsArray, values: any, isPrepend: boolean) {
		if (Array.isArray(strings)) {
			let str = ''

			strings.forEach((string, a) => {
				if (values[a] === 0) values[a] = values[a].toString()

				str += string + (values[a] || '')

				let nextToArg = a < strings.length - 1

				if (!this.opts.inline && !nextToArg) {
					str += '\n'
				}
			})

			str = this.#removeExcessIndent(str)

			if (isPrepend) {
				this.internalOutput = str + this.internalOutput
				if (this.opts.external !== undefined) {
					this.opts.external = str + this.opts.external
				}
			} else {
				this.internalOutput += str
				if (this.opts.external !== undefined) {
					this.opts.external += str
				}
			}
		}
	}

	#removeExcessIndent(str: string): string {
		const lines = str.split('\n')

		const minIndent = lines
			.slice(1)
			.filter((line) => line.trim().length > 0)
			.reduce((min, line) => {
				const leadingWhitespace = line.match(/^\s*/)?.[0].length || 0
				return Math.min(min, leadingWhitespace)
			}, Infinity)

		if (minIndent === Infinity) return str

		const adjustedLines = lines.map((line, index) => {
			if (index === 0) return line
			return line.slice(minIndent)
		})

		return adjustedLines.join('\n')
	}

	#trimTrailingNewLine(str: string): string {
		return str.replace(/\n\s*$/, '')
	}
}
