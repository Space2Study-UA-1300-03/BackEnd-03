import { getMatchOptions } from '#utils/getMatchOptions.js'
import { describe, it, expect } from '@jest/globals'

describe('getMatchOptions', () => {
  it('should return an empty object when filters are empty', () => {
    expect(getMatchOptions({})).toEqual({})
  })

  it('should return an object with only truthy values', () => {
    const filters = { name: 'John', age: 30, city: '' }
    expect(getMatchOptions(filters)).toEqual({ name: 'John', age: 30 })
  })

  it('should exclude null and undefined values', () => {
    const filters = { name: 'Jane', country: null, status: undefined, active: true }
    expect(getMatchOptions(filters)).toEqual({ name: 'Jane', active: true })
  })

  it('should return the same object if all values are truthy', () => {
    const filters = { category: 'electronics', inStock: true, rating: 5 }
    expect(getMatchOptions(filters)).toEqual(filters)
  })
})
