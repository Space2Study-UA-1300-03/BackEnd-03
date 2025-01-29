export const getRegex = (regex = '') => ({
  $regex: regex.length > 0 ? regex : '.*'
})
