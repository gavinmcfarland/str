# str

Str is a template literal tag function that makes it easy to build up strings while ignoring excessive white space.

## Usage

### Appending block strings

By default, Str appends strings on new lines.

```js
let str = new Str();

str.append`.colors {`;
for (let color in colors) {
	let value = colors[color];
	str.append` --${color}: ${value};`;
}
str.append`}`;

console.log(str.output);
```

**Output**

```css
.colors {
	--navy: '#001F3F';
	--blue: '#0074D9';
	--aqua: '#7FDBFF';
	--teal: '#39CCCC';
}
```

## API

- ### Start string

  `Str(string, Opts)`

  When you start the class with a string, it will always begin with that string, even if you prepend something later. If you need a new line, you have to include it manually eg `Str('@\n')`.

  ```ts
  interface Opts {
  	inline?: boolean;
  }
  ```

- ### Append a string

  ` str.append`` `

- ### Prepend a string

  ` str.prepend`` `

- ### Get the output

  `str.output`
