import { mergeArraysUniqueValues } from '#utils/mergeArraysUniqueValues.js'
import { describe, expect, it } from '@jest/globals'

describe('mergeArraysUniqueValues', () => {
  it('should merge two arrays with unique values', () => {
    const firstArray = [1, 2, 3]
    const secondArray = [4, 5, 6]
    const result = mergeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should remove duplicates from second array', () => {
    const firstArray = [1, 2, 3]
    const secondArray = [2, 3, 4]
    const result = mergeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, 2, 3, 4])
  })

  it('should handle empty first array', () => {
    const firstArray = []
    const secondArray = [1, 2, 3]
    const result = mergeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, 2, 3])
  })

  it('should handle empty second array', () => {
    const firstArray = [1, 2, 3]
    const secondArray = []
    const result = mergeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, 2, 3])
  })

  it('should handle both empty arrays', () => {
    const firstArray = []
    const secondArray = []
    const result = mergeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([])
  })

  it('should handle arrays with string values', () => {
    const firstArray = ['a', 'b', 'c']
    const secondArray = ['b', 'c', 'd']
    const result = mergeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should preserve order of elements', () => {
    const firstArray = [3, 1, 2]
    const secondArray = [4, 2, 5]
    const result = mergeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([3, 1, 2, 4, 5])
  })

  it('should handle arrays with mixed types', () => {
    const firstArray = [1, 'a', true]
    const secondArray = ['b', 1, false]
    const result = mergeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, 'a', true, 'b', false])
  })
})
