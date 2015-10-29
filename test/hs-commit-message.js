import test from 'tape'
import index from '../src'

test('module', t => {
  t.equal(typeof index, 'object', 'default export is an object')
  t.end()
})
