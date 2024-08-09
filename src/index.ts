interface Opts {
	inline?: boolean
}

export class Test {
	output: string
	opts?: Opts
	initialString?: string

	constructor(start?: string, opts?: Opts) {
		this.output = start || ''
		this.opts = opts
		this.initialString = start
		return this
	}

	append(strings: TemplateStringsArray, ...values: any) {
		this.#processStrings(strings, values, false) // false indicates appending

		return this
	}

	prepend(strings: TemplateStringsArray, ...values: any) {
		// Remove the initial string from the output before prepending
		if (this.initialString && this.output.startsWith(this.initialString)) {
			this.output = this.output.slice(this.initialString.length)
		}

		this.#processStrings(strings, values, true) // true indicates prepending

		// Then re-apply it so it's at the start of the string
		this.output = this.initialString + this.output

		return this
	}

	get() {
		return this.output
	}

	#processStrings(strings: TemplateStringsArray, values: any, isPrepend: boolean) {
		if (Array.isArray(strings)) {
			let str = ''

			strings.forEach((string, a) => {
				if (values[a] === 0) values[a] = values[a].toString()

				str += string + (values[a] || '')

				let nextToArg = a < strings.length - 1
				if (!this.opts?.inline && !nextToArg) {
					str += '\n'
				}
			})

			str = this.#removeExcessIndent(str)

			if (isPrepend) {
				this.output = str + this.output // Prepend the processed string
			} else {
				this.output += str // Append the processed string
			}
		}
	}

	#removeExcessIndent(str: string): string {
		const lines = str.split('\n')

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
}
