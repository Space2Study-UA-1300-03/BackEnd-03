import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import mongoose from 'mongoose'

// Mock getRegex utility
jest.unstable_mockModule('#utils/getRegex.js', () => ({
  getRegex: jest.fn((value) => (value ? new RegExp(value, 'i') : new RegExp('(?:)', 'i')))
}))

// Mock ObjectId
jest.spyOn(mongoose.Types, 'ObjectId').mockImplementation((value) => value)

const { offerAggregateOptions } = await import('#utils/offers/offerAggregateOptions.js')

describe('offerAggregateOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const getMatchStage = (result) => result.find((stage) => stage.$match)
  const getSortStage = (result) => result.find((stage) => stage.$sort)
  const getFacetStage = (result) => result.find((stage) => stage.$facet)

  it('should return base aggregation with default values', () => {
    const result = offerAggregateOptions({}, {})

    expect(getSortStage(result).$sort).toEqual({ createdAt: -1 })
    expect(getFacetStage(result).$facet.items).toEqual([{ $skip: 0 }, { $limit: 5 }])
  })

  it('should handle search without authorId', () => {
    const query = { search: 'John Doe' }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match.$or).toEqual([
      { title: /John Doe/i },
      { 'author.firstName': /John/i, 'author.lastName': /Doe/i },
      { 'author.firstName': /Doe/i, 'author.lastName': /John/i }
    ])
  })

  it('should handle search with authorId', () => {
    const query = { search: 'Math' }
    const params = { id: '123' }
    const result = offerAggregateOptions(query, params)
    const matchStage = getMatchStage(result)

    expect(matchStage.$match.$or).toEqual([{ title: /Math/i }, { 'subject.name': /Math/i }])
    expect(matchStage.$match['author._id']).toBe('123')
  })

  it('should handle author role filtering', () => {
    const query = { authorRole: 'teacher' }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match.authorRole).toBe('teacher')
  })

  it('should handle proficiency level filtering', () => {
    const query = { proficiencyLevel: ['beginner', 'intermediate'] }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match.proficiencyLevel).toEqual({
      $in: ['beginner', 'intermediate']
    })
  })

  it('should handle price range filtering', () => {
    const query = { price: ['10', '50'] }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match.price).toEqual({
      $gte: 10,
      $lte: 50
    })
  })

  it('should handle rating filtering', () => {
    const query = { rating: '4', authorRole: 'teacher' }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match['author.averageRating.teacher']).toEqual({
      $gte: 4
    })
  })

  it('should handle language filtering with regex', () => {
    const query = { language: 'English' }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match.languages).toEqual(/English/i)
  })

  it('should handle languages array filtering', () => {
    const query = { languages: ['English', 'Spanish'] }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match.languages).toEqual({
      $in: ['English', 'Spanish']
    })
  })

  it('should handle native language filtering', () => {
    const query = { nativeLanguage: 'English' }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match['author.nativeLanguage']).toEqual(/English/i)
  })

  it('should handle excluded offer filtering', () => {
    const query = { excludedOfferId: '123' }
    const result = offerAggregateOptions(query, {})
    const matchStage = getMatchStage(result)

    expect(matchStage.$match._id).toEqual({ $ne: '123' })
  })

  describe('sorting options', () => {
    it('should handle JSON sort object', () => {
      const query = { sort: JSON.stringify({ orderBy: 'createdAt', order: 'asc' }) }
      const result = offerAggregateOptions(query, {})
      const sortStage = getSortStage(result)

      expect(sortStage.$sort).toEqual({ createdAt: 1 })
    })

    it('should handle priceAsc string sort', () => {
      const query = { sort: 'priceAsc' }
      const result = offerAggregateOptions(query, {})
      const sortStage = getSortStage(result)

      expect(sortStage.$sort).toEqual({ price: 1 })
    })

    it('should handle priceDesc string sort', () => {
      const query = { sort: 'priceDesc' }
      const result = offerAggregateOptions(query, {})
      const sortStage = getSortStage(result)

      expect(sortStage.$sort).toEqual({ price: -1 })
    })

    it('should handle rating sort with author role', () => {
      const query = { sort: 'rating', authorRole: 'teacher' }
      const result = offerAggregateOptions(query, {})
      const sortStage = getSortStage(result)

      expect(sortStage.$sort).toEqual({ 'author.averageRating.teacher': -1 })
    })

    it('should handle default sort direction for other fields', () => {
      const query = { sort: 'title' }
      const result = offerAggregateOptions(query, {})
      const sortStage = getSortStage(result)

      expect(sortStage.$sort).toEqual({ title: -1 })
    })
  })

  it('should handle pagination parameters', () => {
    const query = { skip: '10', limit: '20' }
    const result = offerAggregateOptions(query, {})
    const facetStage = getFacetStage(result)

    expect(facetStage.$facet.items).toEqual([{ $skip: 10 }, { $limit: 20 }])
  })

  it('should handle all parameters combined', () => {
    const query = {
      search: 'John',
      authorRole: 'teacher',
      price: ['10', '50'],
      proficiencyLevel: ['intermediate'],
      rating: '4',
      language: 'English',
      nativeLanguage: 'Spanish',
      sort: JSON.stringify({ orderBy: 'price', order: 'asc' }),
      skip: '10',
      limit: '20'
    }
    const params = { id: '123' }

    const result = offerAggregateOptions(query, params)
    const matchStage = getMatchStage(result)
    const sortStage = getSortStage(result)
    const facetStage = getFacetStage(result)

    expect(matchStage.$match).toMatchObject({
      $or: [{ title: /John/i }, { 'subject.name': /John/i }],
      'author._id': '123',
      authorRole: 'teacher',
      price: { $gte: 10, $lte: 50 },
      proficiencyLevel: { $in: ['intermediate'] },
      'author.averageRating.teacher': { $gte: 4 },
      languages: /English/i,
      'author.nativeLanguage': /Spanish/i
    })
    expect(sortStage.$sort).toEqual({ price: 1 })
    expect(facetStage.$facet.items).toEqual([{ $skip: 10 }, { $limit: 20 }])
  })
})
