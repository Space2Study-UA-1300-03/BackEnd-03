import { describe, expect, it } from '@jest/globals'
import { removeArraysUniqueValues } from '#utils/removeArraysUniqueValues.js'

describe('removeArraysUniqueValues', () => {
  it('should remove values from first array that exist in second array', () => {
    const firstArray = [1, 2, 3, 4, 5]
    const secondArray = [2, 4]
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, 3, 5])
  })

  it('should return first array when no matching values found', () => {
    const firstArray = [1, 2, 3]
    const secondArray = [4, 5, 6]
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return empty array when all values match', () => {
    const firstArray = [1, 2, 3]
    const secondArray = [1, 2, 3]
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([])
  })

  it('should handle empty first array', () => {
    const firstArray = []
    const secondArray = [1, 2, 3]
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([])
  })

  it('should handle empty second array', () => {
    const firstArray = [1, 2, 3]
    const secondArray = []
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, 2, 3])
  })

  it('should handle both empty arrays', () => {
    const firstArray = []
    const secondArray = []
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([])
  })

  it('should handle arrays with string values', () => {
    const firstArray = ['apple', 'banana', 'orange', 'grape']
    const secondArray = ['banana', 'grape']
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual(['apple', 'orange'])
  })

  it('should handle arrays with mixed types', () => {
    const firstArray = [1, 'a', true, null, undefined]
    const secondArray = ['a', null, 2]
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([1, true, undefined])
  })

  it('should preserve order of remaining elements', () => {
    const firstArray = [3, 1, 4, 2, 5]
    const secondArray = [1, 5]
    const result = removeArraysUniqueValues(firstArray, secondArray)
    expect(result).toEqual([3, 4, 2])
  })
})
