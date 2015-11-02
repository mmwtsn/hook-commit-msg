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
  const a = buildString(10)
  const b = buildString(50)
  const c = buildString(51)
  const d = [buildString(10), buildString(10)].join('\n')
  const e = [buildString(10), '\n'].join('\n')
  const f = [buildString(10), '\n', buildString(71)].join('\n')
  const g = [buildString(10), '\n', buildString(72)].join('\n')
  const h = [buildString(10), '\n', buildString(73)].join('\n')

  t.equal(formats.base(a), true, 'first line can be under 50')
  t.equal(formats.base(b), true, 'first line can be equal to 50')
  t.equal(formats.base(c), false, 'first line cannot be over 50')
  t.equal(formats.base(d), false, 'second line cannot be used')
  t.equal(formats.base(e), true, 'second line can be blank')
  t.equal(formats.base(f), true, 'third line can be under 72')
  t.equal(formats.base(g), true, 'third line can be equal to 72')
  t.equal(formats.base(h), false, 'third line cannot be over 72')
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
