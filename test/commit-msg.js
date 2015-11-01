import fs from 'fs'
import test from 'tape'
import sinon from 'sinon'
import index from '../src/commit-msg'

test('index', t => {
  t.equal(typeof index, 'object', 'default export is an object')
  t.end()
})

test('.check()', t => {
  const readFileSync = sinon.stub(fs, 'readFileSync')

  index.check()

  t.assert(readFileSync.calledOnce, 'calls fs.readFileSync')
  t.end()
})
