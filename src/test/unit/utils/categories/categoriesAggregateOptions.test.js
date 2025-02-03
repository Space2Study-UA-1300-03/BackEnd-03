import { jest, describe, it, expect, beforeEach } from '@jest/globals'

const mockGetRegex = jest.fn((value) => new RegExp(value, 'i'))
jest.unstable_mockModule('#utils/getRegex.js', () => ({
  getRegex: mockGetRegex
}))

const { categoriesAggregateOptions } = await import('#utils/categories/categoriesAggregateOptions.js')

describe('categoriesAggregateOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return default pipeline when no query parameters provided', () => {
    const result = categoriesAggregateOptions({})

    expect(result).toHaveLength(8)
    expect(result[0].$lookup).toEqual({
      from: 'subjects',
      localField: '_id',
      foreignField: 'category',
      as: 'subjects'
    })
    expect(result[4].$limit).toBe(100)
    expect(mockGetRegex).toHaveBeenCalledWith('')
  })

  it('should apply custom limit when provided', () => {
    const result = categoriesAggregateOptions({ limit: 50 })

    expect(result[4].$limit).toBe(50)
  })

  it('should apply custom name filter when provided', () => {
    const result = categoriesAggregateOptions({ name: 'test' })

    expect(mockGetRegex).toHaveBeenCalledWith('test')
    expect(result[1].$match.name).toBeDefined()
  })

  it('should apply custom skip when provided', () => {
    const result = categoriesAggregateOptions({ skip: 20 })

    expect(result[3].$skip).toBe(20)
    expect(result[6].$facet.items[0].$skip).toBe(20)
  })

  it('should include proper sorting stage', () => {
    const result = categoriesAggregateOptions({})

    expect(result[2].$sort).toEqual({
      totalOffers: -1,
      updatedAt: -1
    })
  })

  it('should include proper projection stage', () => {
    const result = categoriesAggregateOptions({})

    expect(result[5].$project).toEqual({
      subjects: 0
    })
  })

  it('should handle facet stage correctly', () => {
    const result = categoriesAggregateOptions({})

    expect(result[6].$facet).toEqual({
      items: [{ $skip: 0 }, { $limit: 100 }],
      count: [{ $count: 'count' }]
    })
  })

  it('should handle final projection stage with count conditions', () => {
    const result = categoriesAggregateOptions({})

    expect(result[7].$project).toEqual({
      items: 1,
      count: {
        $cond: {
          if: { $eq: ['$count', []] },
          then: 0,
          else: { $arrayElemAt: ['$count.count', 0] }
        }
      }
    })
  })

  it('should parse string values for limit and skip to numbers', () => {
    const result = categoriesAggregateOptions({ limit: '50', skip: '10' })

    expect(result[3].$skip).toBe(10)
    expect(result[4].$limit).toBe(50)
    expect(result[6].$facet.items[0].$skip).toBe(10)
    expect(result[6].$facet.items[1].$limit).toBe(50)
  })
})
