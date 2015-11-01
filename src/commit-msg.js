import fs from 'fs'

export const formats = {
  base (message) {
    const lines = message.split('\n')
    return lines[0].length <= 50
  }
}

export default {
  check (format='base', file='./.git/COMMIT_EDITMSG') {
    if (!formats[format]) throw new Error('Requested format does not exist.')

    return formats[format](fs.readFileSync(file))
  }
}
