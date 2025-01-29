/**
 * Capitalizes the first letter of a string if it's lowercase
 * @param {string} string - Input string
 * @returns {string} String with first letter capitalized if it was lowercase
 * @throws {TypeError} If input is not a string
 */
export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') {
    throw new TypeError('Input must be a string')
  }
  if (!string) {
    return string
  }
  if (string[0] === string[0].toLowerCase()) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  }
  return string
}
