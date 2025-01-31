import { describe, it, expect } from '@jest/globals'
import { getSortOptions } from '#utils/getSortOptions.js'

describe('getSortOptions', () => {
  it('should return correct sort options when valid JSON is provided', () => {
    const sort = JSON.stringify({ order: 'desc', orderBy: 'createdAt' })
    const result = getSortOptions(sort)
    expect(result).toEqual({ createdAt: 'desc' })
  })

  it('should return default sort options when orderBy is missing', () => {
    const sort = JSON.stringify({ order: 'desc' })
    const result = getSortOptions(sort)
    expect(result).toEqual({ updatedAt: 'desc' })
  })

  it('should return default sort options when order is missing', () => {
    const sort = JSON.stringify({ orderBy: 'createdAt' })
    const result = getSortOptions(sort)
    expect(result).toEqual({ createdAt: 'asc' })
  })

  it('should return default sort options when JSON is invalid', () => {
    const sort = '{invalidJson:'
    const result = getSortOptions(sort)
    expect(result).toEqual({ updatedAt: 'asc' })
  })

  it('should return default sort options when sort is empty', () => {
    const result = getSortOptions('')
    expect(result).toEqual({ updatedAt: 'asc' })
  })
})
