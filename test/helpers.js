export default {
  /**
   * Creates a string of length `length` to be used for commit length checks.
   *
   * @param {string} length
   * @returns {string}
   */
  buildString (length) {
    let string = ''

    for (let i = 0; i < length; i++) {
      string += '_'
    }

    return string
  }
}
