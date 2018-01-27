'use strict'

const test = require('tape')
const slice = require('./')

const cases = [
  // empty string
  ['', 0, undefined, ''],
  ['', 1, undefined, ''],
  ['', 0, 1, ''],
  ['', 1, 2, ''],

  // just linebreaks
  ['\n', 0, undefined, '\n'],
  ['\n', 1, undefined, ''],
  ['\n', 2, undefined, ''],
  ['\r\n', 0, undefined, '\r\n'],
  ['\r\n', 1, undefined, ''],
  ['\r\n', 2, undefined, ''],
  ['\n', 0, 1, ''],
  ['\n', 1, 2, ''],
  ['\n', 2, 3, ''],
  ['\r\n', 0, 1, ''],
  ['\r\n', 1, 2, ''],
  ['\r\n', 2, 3, ''],

  // one line
  ['foo', 0, undefined, 'foo'],
  ['foo', 1, undefined, ''],
  ['foo', 0, 1, 'foo'],
  ['foo', 1, 2, ''],

  // line break on first line
  ['\nfoo', 0, undefined, '\nfoo'],
  ['\nfoo', 1, undefined, 'foo'],
  ['\nfoo', 2, undefined, ''],
  ['\r\nfoo', 0, undefined, '\r\nfoo'],
  ['\r\nfoo', 1, undefined, 'foo'],
  ['\r\nfoo', 2, undefined, ''],
  ['\nfoo', 0, 1, ''],
  ['\nfoo', 1, 2, 'foo'],
  ['\nfoo', 2, 3, ''],
  ['\r\nfoo', 0, 1, ''],
  ['\r\nfoo', 1, 2, 'foo'],
  ['\r\nfoo', 2, 3, ''],

  // line break on last line
  ['foo\n', 0, undefined, 'foo\n'],
  ['foo\n', 1, undefined, ''],
  ['foo\n', 2, undefined, ''],
  ['foo\r\n', 0, undefined, 'foo\r\n'],
  ['foo\r\n', 1, undefined, ''],
  ['foo\r\n', 2, undefined, ''],
  ['foo\n', 0, 1, 'foo'],
  ['foo\n', 1, 2, ''],
  ['foo\n', 2, 3, ''],
  ['foo\r\n', 0, 1, 'foo'],
  ['foo\r\n', 1, 2, ''],
  ['foo\r\n', 2, 3, ''],

  // multiline
  ['\na\nb\n\nc\nd\n', 0, undefined, '\na\nb\n\nc\nd\n'],
  ['\na\nb\n\nc\nd\n', 1, undefined, 'a\nb\n\nc\nd\n'],
  ['\na\nb\n\nc\nd\n', 2, undefined, 'b\n\nc\nd\n'],
  ['\na\nb\n\nc\nd\n', 3, undefined, '\nc\nd\n'],
  ['\na\nb\n\nc\nd\n', 4, undefined, 'c\nd\n'],
  ['\na\nb\n\nc\nd\n', 5, undefined, 'd\n'],
  ['\na\nb\n\nc\nd\n', 6, undefined, ''],
  ['\na\nb\n\nc\nd\n', 7, undefined, ''],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 0, undefined, '\r\na\r\nb\r\n\r\nc\r\nd\r\n'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 1, undefined, 'a\r\nb\r\n\r\nc\r\nd\r\n'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 2, undefined, 'b\r\n\r\nc\r\nd\r\n'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 3, undefined, '\r\nc\r\nd\r\n'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 4, undefined, 'c\r\nd\r\n'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 5, undefined, 'd\r\n'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 6, undefined, ''],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 7, undefined, ''],
  ['\na\nb\n\nc\nd\n', 0, 1, ''],
  ['\na\nb\n\nc\nd\n', 1, 2, 'a'],
  ['\na\nb\n\nc\nd\n', 2, 3, 'b'],
  ['\na\nb\n\nc\nd\n', 3, 4, ''],
  ['\na\nb\n\nc\nd\n', 4, 5, 'c'],
  ['\na\nb\n\nc\nd\n', 5, 6, 'd'],
  ['\na\nb\n\nc\nd\n', 6, 7, ''],
  ['\na\nb\n\nc\nd\n', 7, 8, ''],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 0, 1, ''],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 1, 2, 'a'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 2, 3, 'b'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 3, 4, ''],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 4, 5, 'c'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 5, 6, 'd'],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 6, 7, ''],
  ['\r\na\r\nb\r\n\r\nc\r\nd\r\n', 7, 8, ''],

  // endIndex
  ['a\nb\nc', 0, 0, ''],
  ['a\nb\nc', 0, 1, 'a'],
  ['a\nb\nc', 0, 2, 'a\nb'],
  ['a\nb\nc', 0, 3, 'a\nb\nc'],
  ['a\nb\nc', 0, 4, 'a\nb\nc'],
  ['a\nb\nc', 1, 0, ''],
  ['a\nb\nc', 1, 2, 'b'],
  ['a\nb\nc', 2, 3, 'c'],
  ['a\nb\nc', 1, 3, 'b\nc'],
  ['a\nb\nc', 2, 4, 'c'],
  ['a\r\nb\r\nc', 0, 0, ''],
  ['a\r\nb\r\nc', 0, 1, 'a'],
  ['a\r\nb\r\nc', 0, 2, 'a\r\nb'],
  ['a\r\nb\r\nc', 0, 3, 'a\r\nb\r\nc'],
  ['a\r\nb\r\nc', 0, 4, 'a\r\nb\r\nc'],
  ['a\r\nb\r\nc', 1, 0, ''],
  ['a\r\nb\r\nc', 1, 2, 'b'],
  ['a\r\nb\r\nc', 2, 3, 'c'],
  ['a\r\nb\r\nc', 1, 3, 'b\r\nc'],
  ['a\r\nb\r\nc', 2, 4, 'c'],

  // negative indexes
  ['a\nb\nc', -1, undefined, 'c'],
  ['a\nb\nc', -2, undefined, 'b\nc'],
  ['a\nb\nc', -3, undefined, 'a\nb\nc'],
  ['a\nb\nc', -4, undefined, 'a\nb\nc'],
  ['a\nb\nc', 0, -1, 'a\nb'],
  ['a\nb\nc', 0, -2, 'a'],
  ['a\nb\nc', 0, -3, ''],
  ['a\nb\nc', -2, -1, 'b'],
  ['a\nb\nc', -3, -2, 'a'],
  ['a\nb\nc', -4, -3, '']
]

cases.forEach(function (testCase) {
  test(`str: ${JSON.stringify(testCase[0])}, offset: ${testCase[1]}, lines: ${testCase[2]}`, function (t) {
    t.equal(slice.apply(null, testCase), testCase[3])
    t.end()
  })
})
