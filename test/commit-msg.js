import fs from 'fs'
import test from 'tape'
import sinon from 'sinon'
import index, {formats} from '../src/commit-msg'

test('index', t => {
  t.equal(typeof index, 'object', 'default export is an object')
  t.end()
})

test('index.check()', t => {
  const readFileSync = sinon.stub(fs, 'readFileSync')
  const base = sinon.stub(formats, 'base')

  index.check('base', './test/fixtures/COMMIT_EDITMSG')

  t.throws(() => { index.check('nein')}, 'calls an existing format')
  t.assert(readFileSync.calledOnce, 'calls fs.readFileSync')
  t.assert(base.calledOnce, 'calls formats.base')

  formats.base.restore()

  t.end()
})

test('formats', t => {
  t.equal(typeof formats, 'object', 'is an object')
  t.end()
})

test('formats.base()', t => {
  t.equal(formats.base(buildString(10)), true, 'first line can be under 50')
  t.equal(formats.base(buildString(50)), true, 'first line can be equal to 50')

  t.throws(() => {
    formats.base(buildString(51))
  }, 'first line cannot be over 50')

  t.throws(() => {
    formats.base([buildString(10), buildString(10)].join('\n'))
  }, 'second line cannot be used')

  t.equal(formats.base(
    [buildString(10), '\n'].join('\n')
  ), true, 'second line can be blank')

  t.equal(formats.base(
    [buildString(10), '\n', buildString(71)].join('\n')
  ), true, 'third line can be under 72')

  t.equal(formats.base(
    [buildString(10), '\n', buildString(72)].join('\n')
  ), true, 'third line can be equal to 72')

  t.throws(() => {
    formats.base([buildString(10), '\n', buildString(73)].join('\n'))
  }, 'third line cannot be over 72')

  t.assert(typeof formats.base, 'is a function')
  t.end()
})

function buildString (length) {
  let string = ''

  for (let i = 0; i < length; i++) {
    string += '_'
  }

  return string
}
