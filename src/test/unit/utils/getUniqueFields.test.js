import { getUniqueFields } from '#utils/getUniqueFields.js'
import { describe, expect, it } from '@jest/globals'

describe('getUniqueFields', () => {
  it('should extract unique fields from the message', () => {
    const message = '{field1: value1, field2: value2, field3: value3}'
    const result = getUniqueFields(message)
    expect(result).toBe('field1, field2, field3')
  })

  it('should handle messages with no fields', () => {
    const message =
      'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "test@test.com" }'
    const result = getUniqueFields(message)
    expect(result).toBe('email')
  })

  it('should handle messages with nested objects', () => {
    const message = '{field1: {nestedField1: value1}, field2: value2}'
    const result = getUniqueFields(message)
    expect(result).toBe('field1, nestedField1')
  })

  it('should handle messages with special characters in values', () => {
    const message = '{field1: value1, field2: "value2, with, commas", field3: value3}'
    const result = getUniqueFields(message)
    expect(result).toBe('field1, field2, field3')
  })

  it('should throw an error for invalid message format', () => {
    const message = 'invalid message'
    expect(() => getUniqueFields(message)).toThrow()
  })
})
