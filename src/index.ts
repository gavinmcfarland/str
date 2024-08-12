interface Opts {
	inline?: boolean
	external?: string
}

export class Str {
	private opts: Opts
	private initialString?: string

	constructor(start?: string, opts: Opts = {}) {
		this.opts = opts
		this.initialString = start
		this.opts.external = opts.external || ''
	}

	append(strings: TemplateStringsArray, ...values: any) {
		this.#processStrings(strings, values, false) // false indicates appending
		return this
	}

	prepend(strings: TemplateStringsArray, ...values: any) {
		// If starts with initial string, remove
		// let removedInitialString
		if (this.opts.external && this.initialString) {
			if (this.opts.external.startsWith(this.initialString)) {
				// removedInitialString = true
				this.opts.external = this.opts.external!.slice(this.initialString.length)
			}
		}

		this.#processStrings(strings, values, true) // true indicates prepending

		// Re-apply initial string
		if (this.initialString) {
			this.opts.external = this.initialString + this.opts.external
		}

		return this
	}

	get output() {
		return this.#trimTrailingNewLine(this.opts.external ?? '')
	}

	get() {
		return this.#trimTrailingNewLine(this.opts.external ?? '')
	}

	#processStrings(strings: TemplateStringsArray, values: any, isPrepend: boolean) {
		if (Array.isArray(strings)) {
			let str = ''

			// Re-apply initial string
			if (!isPrepend) {
				if (this.initialString && !this.opts.external) {
					str = this.initialString + str
				}
			}

			if (!this.opts.inline && !isPrepend && this.opts.external) {
				str = str + '\n'
			}

			let str2 = ''
			strings.forEach((string, a) => {
				// If string starts with a new line, remove it
				if (a === 0) {
					string = string.replace(/^\n+/, '')
				}

				if (values[a] === 0) values[a] = values[a].toString()

				str2 += string + (values[a] || '')
			})

			str = str + this.#removeExcessIndent(str2)
			// str = str + str2

			if (!this.opts.inline && isPrepend && this.opts.external) {
				str = str + '\n'
			}

			if (isPrepend) {
				str = str + this.opts.external
			} else {
				str = this.opts.external + str
			}

			this.opts.external = str
		}
	}

	#removeExcessIndent(str: string): string {
		// Remove trailing white space
		str = str.replace(/\n\s*$/, '')
		const lines = str.split('\n')

		// Remove white space from first line if more than 1 line
		if (lines.length > 1) {
			lines[0] = lines[0].trim()
		}

		// Find the minimum indentation of non-empty lines (excluding the first line)
		const minIndent = lines
			.slice(1) // Skip the first line
			.filter((line) => line.trim().length > 0) // Exclude empty lines
			.reduce((min, line) => {
				const leadingWhitespace = line.match(/^\s*/)?.[0].length || 0
				return Math.min(min, leadingWhitespace)
			}, Infinity)

		if (minIndent === Infinity) return str // In case all lines are empty or it's a single-line string

		// Remove the minimum indentation from all lines except the first
		const adjustedLines = lines.map((line, index) => {
			if (index === 0) return line // Keep the first line as is
			return line.slice(minIndent) // Remove the excess indent from other lines
		})

		return adjustedLines.join('\n')
	}

	#trimTrailingNewLine(str: string): string {
		return str.replace(/\n\s*$/, '')
	}
}
