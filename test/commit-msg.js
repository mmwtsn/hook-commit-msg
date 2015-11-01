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
  const under = '..........' // 10
  const equal = '..................................................' // 50
  const over = '...................................................' // 51

  t.equal(formats.base(under), true)
  t.equal(formats.base(equal), true)
  t.equal(formats.base(over), false)
  t.assert(typeof formats.base, 'is a function')
  t.end()
})
