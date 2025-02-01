import { jest, describe, it, expect, beforeEach } from '@jest/globals'

// Mock getRegex utility
jest.unstable_mockModule('#utils/getRegex.js', () => ({
  getRegex: jest.fn((value) => (value ? new RegExp(value, 'i') : new RegExp('(?:)', 'i')))
}))

const { createAggregateOptions, generateOptions } = await import('#utils/users/createAggregateOptions.js')

describe('generateOptions', () => {
  it('should return [true, false] when no value provided', () => {
    expect(generateOptions()).toEqual([true, false])
  })

  it('should convert string "true" to boolean array', () => {
    expect(generateOptions('true')).toEqual([true])
  })

  it('should handle array of values', () => {
    expect(generateOptions(['true', 'false'])).toEqual([true, false])
  })
})

describe('createAggregateOptions', () => {
  it('should create basic query with default values', () => {
    const query = {}
    const result = createAggregateOptions(query)

    expect(result).toEqual({
      match: {
        $or: [
          { firstName: /(?:)/i, lastName: /(?:)/i },
          { firstName: /(?:)/i, lastName: /(?:)/i }
        ],
        email: /(?:)/i,
        isFirstLogin: { $in: [true, false] },
        isEmailConfirmed: { $in: [true, false] }
      },
      sort: { undefined: -1 },
      limit: 5,
      skip: 0
    })
  })

  it('should handle name search properly', () => {
    const query = { name: 'John Doe' }
    const result = createAggregateOptions(query)

    expect(result.match.$or).toEqual([
      { firstName: /John/i, lastName: /Doe/i },
      { firstName: /Doe/i, lastName: /John/i }
    ])
  })

  it('should handle role filtering', () => {
    const query = { role: 'admin' }
    const result = createAggregateOptions(query)

    expect(result.match.role).toBe('admin')
  })

  it('should handle date range filtering', () => {
    const from = '2024-01-01'
    const to = '2024-01-31'
    const query = { lastLogin: JSON.stringify({ from, to }) }
    const result = createAggregateOptions(query)

    expect(result.match.lastLogin).toEqual({
      $gte: new Date(from),
      $lte: new Date(new Date(to).setHours(23, 59, 59))
    })
  })

  it('should handle status filtering with role', () => {
    const query = {
      role: 'admin',
      status: ['active', 'suspended']
    }
    const result = createAggregateOptions(query)

    expect(result.match['status.admin']).toEqual({
      $in: ['active', 'suspended']
    })
  })

  it('should handle sorting by name', () => {
    const query = {
      sort: JSON.stringify({ orderBy: 'name', order: 'asc' })
    }
    const result = createAggregateOptions(query)

    expect(result.sort).toEqual({
      firstName: 1,
      lastName: 1
    })
  })

  it('should handle sorting by other fields', () => {
    const query = {
      sort: JSON.stringify({ orderBy: 'email', order: 'desc' })
    }
    const result = createAggregateOptions(query)

    expect(result.sort).toEqual({
      email: -1
    })
  })

  it('should handle pagination parameters', () => {
    const query = {
      limit: '10',
      skip: '20'
    }
    const result = createAggregateOptions(query)

    expect(result.limit).toBe(10)
    expect(result.skip).toBe(20)
  })

  it('should handle all parameters combined', () => {
    const query = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: ['active'],
      isFirstLogin: 'true',
      isEmailConfirmed: 'false',
      lastLogin: JSON.stringify({
        from: '2024-01-01',
        to: '2024-01-31'
      }),
      sort: JSON.stringify({
        orderBy: 'name',
        order: 'desc'
      }),
      limit: '10',
      skip: '20'
    }

    const result = createAggregateOptions(query)

    expect(result).toMatchObject({
      match: {
        $or: [
          { firstName: /John/i, lastName: /Doe/i },
          { firstName: /Doe/i, lastName: /John/i }
        ],
        email: /john@example.com/i,
        role: 'admin',
        'status.admin': { $in: ['active'] },
        isFirstLogin: { $in: [true] },
        isEmailConfirmed: { $in: [false] },
        lastLogin: {
          $gte: new Date('2024-01-01'),
          $lte: new Date(new Date('2024-01-31').setHours(23, 59, 59))
        }
      },
      sort: {
        firstName: -1,
        lastName: -1
      },
      limit: 10,
      skip: 20
    })
  })
})
