import test from 'tape'
import formats from '../src/formats'

test('formats', t => {
  t.equal(typeof formats, 'object', 'is an object')
  t.end()
})

test('formats.base()', t => {
  t.assert(typeof formats.base, 'is a function')

  t.equal(formats.base(buildString(10)), true, 'subject can be under 50')
  t.equal(formats.base(buildString(50)), true, 'subject can be equal to 50')

  t.throws(() => {
    formats.base(buildString(51))
  }, 'subject cannot be over 50')

  t.throws(() => {
    formats.base('err.')
  }, 'subject cannot end with a period')

  t.throws(() => {
    formats.base([buildString(10), buildString(10)].join('\n'))
  }, 'subject must be followed by a blank line')

  t.equal(formats.base(
    [buildString(10), '\n', buildString(71)].join('\n')
  ), true, 'description can be under 72')

  t.equal(formats.base(
    [buildString(10), '\n', buildString(72)].join('\n')
  ), true, 'description can be equal to 72')

  t.throws(() => {
    formats.base([buildString(10), '\n', buildString(73)].join('\n'))
  }, 'description cannot be over 72')

  t.end()
})

function buildString (length) {
  let string = ''

  for (let i = 0; i < length; i++) {
    string += '_'
  }

  return string
}
