import { getCategoriesOptions } from '#utils/getCategoriesOption.js'

describe('getCategoriesOptions', () => {
  test('should return null for "null" string in categories', () => {
    const categories = ['null', 'category1', 'category2']
    const result = getCategoriesOptions(categories)
    expect(result).toEqual([null, 'category1', 'category2'])
  })

  test('should return the same array if no "null" string is present', () => {
    const categories = ['category1', 'category2']
    const result = getCategoriesOptions(categories)
    expect(result).toEqual(['category1', 'category2'])
  })

  test('should return an empty array if categories is an empty array', () => {
    const categories = []
    const result = getCategoriesOptions(categories)
    expect(result).toEqual([])
  })

  test('should return undefined if categories is undefined', () => {
    const result = getCategoriesOptions(undefined)
    expect(result).toBeUndefined()
  })

  test('should return undefined if categories is null', () => {
    const result = getCategoriesOptions(null)
    expect(result).toBeUndefined()
  })

  test('should handle mixed types in categories array', () => {
    const categories = ['null', 123, true, 'category']
    const result = getCategoriesOptions(categories)
    expect(result).toEqual([null, 123, true, 'category'])
  })
})
