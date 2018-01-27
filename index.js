'use strict'

const count = require('quickly-count-substrings')
const indexOf = require('nth-indexof')

module.exports = slice

function slice (str, beginIndex, endIndex) {
  let start = 0

  if (beginIndex < 0 || endIndex < 0) {
    const lineCount = count(str, '\n') + 1
    if (beginIndex < 0) beginIndex = Math.max(0, lineCount + beginIndex)
    if (endIndex < 0) endIndex = Math.max(0, lineCount + endIndex)
  }

  if (endIndex !== undefined && endIndex - beginIndex <= 0) return ''

  if (beginIndex > 0) {
    start = indexOf(str, '\n', beginIndex - 1)
    if (start === -1) return ''
    start++
  }

  if (endIndex === undefined) return str.slice(start)

  const end = indexOf(str, '\n', endIndex - beginIndex - 1, start)

  return str.slice(
    start,
    end === -1
      ? undefined
      : (str[end - 1] === '\r' ? end - 1 : end)
  )
}
