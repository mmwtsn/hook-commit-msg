import fs from 'fs'

export default {
  check (format='base', file='./.git/COMMIT_EDITMSG') {
    return fs.readFileSync(file)
  }
}
