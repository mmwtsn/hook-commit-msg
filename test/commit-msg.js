import fs from 'fs'
import test from 'tape'
import sinon from 'sinon'
import index, {formats} from '../src/commit-msg'

test('index', t => {
  t.equal(typeof index, 'object', 'default export is an object')
  t.end()
})

test('.check()', t => {
  const readFileSync = sinon.stub(fs, 'readFileSync')
  const base = sinon.stub(formats, 'base')

  index.check('base', './test/fixtures/COMMIT_EDITMSG')

  t.throws(() => { index.check('nein')}, 'calls an existing format')
  t.assert(readFileSync.calledOnce, 'calls fs.readFileSync')
  t.assert(base.calledOnce, 'calls formats.base')
  t.end()
})
