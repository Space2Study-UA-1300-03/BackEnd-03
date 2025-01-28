export const mergeArraysUniqueValues = (firstArray, secondArray) => {
  const uniqueValuesArray = secondArray.filter((item) => !firstArray.includes(item))

  return firstArray.concat(uniqueValuesArray)
}
