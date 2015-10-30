import test from 'tape'
import index from '../src/commit-msg'

test('index', t => {
  t.equal(typeof index, 'object', 'default export is an object')
  t.end()
})
