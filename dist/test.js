"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../dist/index.js");
let str = new index_js_1.Str("--start", { autoNewLine: true });
str `new`;
str `line`;
str `again`;
console.log(str());
// let str2 = new Str("--ffff")
// str2`fff`
// str2`+fff`
// str2.prepend`+before`
// console.log(str2())
// str`:where(html) {\n`
// str`	--font-size-1: 16px;\n`
// str`}\n`
// str.prepend`:root {}\n`
// console.log(str())
