# str

Str is a template literal tag function that makes it easy to build up strings while ignoring unnecessary indents.

> [!NOTE]
> This package has not been published yet and is a work in progress.

## Install

```shell
npm install https://github.com/gavinmcfarland/str.git --save-dev
```

## Usage

### Appending block strings

By default, Str appends strings on new lines.

```js
import { Str } from 'str'

let str = new Str()

str.append`.colors {`
for (let color in colors) {
    let value = colors[color]
    str.append` --${color}: ${value};`
}
str.append`}`

console.log(str.output)
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

-   ### Start string

    `Str(start?: string, opts?: Opts)`

    When you start the class with a string, it will always begin with that string, even if you prepend something later. If you need a new line, you should include it manually eg `Str('@\n')`.

    #### Options

    ```ts
    interface Opts {
        inline?: boolean
        external?: string
    }
    ```

    -   **`inline`** By default Str appends strings in a block with new lines, to change this, set to `true`.
    -   **`external`** Allows you to combine strings by storing them externally. To use, make sure you pass the whole object, eg `Str('', opts)`.

-   ### Append a string

    ` str.append`` `

-   ### Prepend a string

    ` str.prepend`` `

-   ### Get the output

    `str.output`
