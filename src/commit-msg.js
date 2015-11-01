import fs from 'fs'

export const formats = {
  base () {
    return true
  }
}

export default {
  check (format='base', file='./.git/COMMIT_EDITMSG') {
    return formats[format](fs.readFileSync(file))
  }
}
