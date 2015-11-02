import fs from 'fs'

export const formats = {
  base (message) {
    const results = message.split('\n').map((line, i) => {
      if (i === 0 && line.length >= 51) return false
      if (i === 1 && line.length > 0) return false
      if (i > 1 && line.length >= 73) return false

      return true
    })

    return results.every(result => result)
  }
}

export default {
  check (format='base', file='./.git/COMMIT_EDITMSG') {
    if (!formats[format]) throw new Error('Requested format does not exist.')

    return formats[format](fs.readFileSync(file))
  }
}
