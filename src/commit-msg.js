import fs from 'fs'

export const formats = {
  base (message) {
    const results = message.split('\n').map((line, i) => {
      if (i === 0 && line.length >= 51) {
        throw new Error('Subject must be 50 characters or less')
      }

      if (i === 0 && line.match(/\.$/)) {
        throw new Error('Subject should not end with a period')
      }

      if (i === 0 && line.length >= 51) {
        throw new Error('Subject must be 50 characters or less')
      }

      if (i === 1 && line.length > 0) {
        throw new Error('Subject must be followed by a blank line')
      }

      if (i > 1 && line.length >= 73) {
        throw new Error('Description must be 72 characters or less')
      }

      return true
    })

    return results.every(result => result)
  }
}

export default {
  check (format='base', file='./.git/COMMIT_EDITMSG') {
    if (!formats[format]) {
      throw new Error('Requested format does not exist.')
    }

    return formats[format](fs.readFileSync(file))
  }
}
