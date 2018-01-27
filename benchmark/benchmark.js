'use strict'

const fs = require('fs')
const bench = require('nanobench')
const sliceLines = require('slice-lines')
const count = require('quickly-count-substrings')

let str = fs.readFileSync('big.txt')
str = str + str + str + str

const lineCount = count(str, '\n') + 1

console.log('Sample text size:', str.length)
console.log('Number of lines in smaple text:', lineCount)

let _r = 0
const results = new Array(6)

bench('sliceLines(str, 0, 1) // V8 unoptimized', function (b) {
  const r = sliceLines(str, 10000, 10001)
  b.end()
  results[_r++] = r
})

bench('sliceLines(str, 0, 1) // V8 optimized', function (b) {
  for (var n = 0; n < 1000; n++) {
    sliceLines(str, n, n + 1)
  }
  b.start()
  const r = sliceLines(str, 10000, 10001)
  b.end()
  results[_r++] = r
})

bench('sliceLines(str, 10000, 10001)', function (b) {
  const r = sliceLines(str, 10000, 10001)
  b.end()
  results[_r++] = r
})

bench('sliceLines(str, -1) // last line relative', function (b) {
  const r = sliceLines(str, -1)
  b.end()
  results[_r++] = r
})

bench(`sliceLines(str, ${lineCount - 1}) // last line by index`, function (b) {
  const r = sliceLines(str, lineCount - 1)
  b.end()
  results[_r++] = r
})

bench('str.split(\'\\n\')[10000]', function (b) {
  const r = str.split('\n')[10000]
  b.end()
  results[_r++] = r
})

bench('str.split(/\\r?\\n/)[10000]', function (b) {
  const r = str.split(/\r?\n/)[10000]
  b.end()
  results[_r++] = r
})
