# slice-lines

Extract a subset of lines from a string.

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

## License

MIT
