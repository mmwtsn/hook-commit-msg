import fs from 'fs'

export const formats = {
  base () {
    return true
  }
}

export default {
  check (format='base', file='./.git/COMMIT_EDITMSG') {
    if (!formats[format]) throw new Error('Requested format does not exist.')

    return formats[format](fs.readFileSync(file))
  }
}
