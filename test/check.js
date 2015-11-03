import fs from 'fs'
import test from 'tape'
import sinon from 'sinon'
import index from '../src/check'
import formats from '../src/formats'

test('index', t => {
  t.equal(typeof index, 'object', 'default export is an object')
  t.end()
})

test('index.check()', t => {
  const readFileSync = sinon.stub(fs, 'readFileSync')
  const base = sinon.stub(formats, 'base')
  const path = './test/fixtures/COMMIT_EDITMSG'

  index.check('base', path)

  t.throws(() => { index.check('nein')}, 'calls an existing format')
  t.assert(readFileSync.calledOnce, 'calls fs.readFileSync')
  t.same(readFileSync.firstCall.args[0], path, 'calls with correct file path')
  t.same(readFileSync.firstCall.args[1], 'utf8', 'calls with correct encoding')
  t.assert(base.calledOnce, 'calls formats.base')

  formats.base.restore()

  t.end()
})
