# slice-lines

Very efficient module for extracting a subset of lines from a string.

Similar to `str.slice(beginIndex, endIndex)` except that the indexes are
lines instead of bytes.

[![Build status](https://travis-ci.org/watson/slice-lines.svg?branch=master)](https://travis-ci.org/watson/slice-lines)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install slice-lines --save
```

## Usage

```js
const sliceLines = require('slice-lines')

const text = 'first line\n2nd line\r\nlast line'

sliceLines(text, 1)    // => "2nd line\r\nlast line"
sliceLines(text, 1, 2) // => "2nd line"
sliceLines(text, 0, 2) // => "first line\n2nd line"
sliceLines(text, -1))  // => "last line"
```

## API

### `lines = sliceLines(str, beginIndex[, endIndex])`

Returns a string containing the requested lines.

Arguments:

- `str` - The string to extract lines from
- `beginIndex` - The zero-based line index at which to begin extraction.
  If negative, it is treated as `totalLines + beginIndex` where
  `totalLines` is the total number of lines in `str` (for example, if
  `beginIndex` is `-3` it is treated as `totalLines - 3`). If
  `beginIndex` is greater than or equal to the total number of lines in
  the string, `sliceLines()` returns an empty string
- `endIndex` - Optional. The zero-based line index before which to end
  extraction. The line at this index will not be included. If `endIndex`
  is omitted, `sliceLines()` extracts to the end of the string. If
  negative, it is treated as `totalLines + endIndex` where `totalLines`
  is the total number of lines in `str` (for example, if `endIndex` is
  `-3` it is treated as `totalLines - 3`)

## Benchmark

The classic way of extracting a specific line from a text in JavaScript
is using `str.split()` with either `\n` as the separator or the even
slower regex `/\r?\n/` if support for Windows line-breaks are required.

That approach requires a complete traversal of the entire text +
contruction of new objects and strings for each line in the text.

As seen below `sliceLines()` can be several orders of magnitudes faster
and scales linear with the amount of lines in the text.

Example extracting a line from a text with 500,000 lines

```
# sliceLines(str, 0, 1) // V8 unoptimized
ok ~1.19 ms (0 s + 1189464 ns)

# sliceLines(str, 0, 1) // V8 optimized
ok ~258 μs (0 s + 258238 ns)

# sliceLines(str, 10000, 10001)
ok ~406 μs (0 s + 406363 ns)

# sliceLines(str, -1) // last line relative
ok ~26 ms (0 s + 25749953 ns)

# sliceLines(str, 513828) // last line by index
ok ~15 ms (0 s + 14732301 ns)

# str.split('\n')[10000]
ok ~120 ms (0 s + 119909150 ns)

# str.split(/\r?\n/)[10000]
ok ~175 ms (0 s + 174632829 ns)
```

## License

MIT
