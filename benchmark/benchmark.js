'use strict'

const fs = require('fs')
const assert = require('assert')
const bench = require('nanobench')

let str = fs.readFileSync('big.txt')
str = str + str + str + str
console.log('Sample text size:', str.length)

const sliceLines = require('slice-lines')

// important to access all of str before any benchmark to ensure it's ready in
// memory
sliceLines(str, 0, 0)

const line = 10018
const expected = 'boats.'

bench('sliceLines(str, lineNo, lineNo + 1)', function (b) {
  const r = sliceLines(str, line, line + 1)
  b.end()
  assert.equal(r, expected)
})

bench('str.split(\'\\n\')[lineNo]', function (b) {
  const r = str.split('\n')[line]
  b.end()
  assert.equal(r, expected)
})

bench('str.split(/\\r?\\n/)[lineNo]', function (b) {
  const r = str.split(/\r?\n/)[line]
  b.end()
  assert.equal(r, expected)
})
