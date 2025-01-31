import { filterAllowedFields } from '#utils/filterAllowedFields.js'
import { describe, it, expect } from '@jest/globals'

describe('filterAllowedFields', () => {
  it('should return only allowed fields', () => {
    const fields = { name: 'John', age: 30, role: 'admin' }
    const allowedFields = { name: true, age: true }
    const result = filterAllowedFields(fields, allowedFields)
    expect(result).toEqual({ name: 'John', age: 30 })
  })

  it('should return an empty object if no fields are allowed', () => {
    const fields = { name: 'John', age: 30 }
    const allowedFields = {}
    const result = filterAllowedFields(fields, allowedFields)
    expect(result).toEqual({})
  })

  it('should return an empty object if input fields are empty', () => {
    const fields = {}
    const allowedFields = { name: true, age: true }
    const result = filterAllowedFields(fields, allowedFields)
    expect(result).toEqual({})
  })

  it('should return an empty object if both inputs are empty', () => {
    const fields = {}
    const allowedFields = {}
    const result = filterAllowedFields(fields, allowedFields)
    expect(result).toEqual({})
  })

  it('should not include fields that are not explicitly allowed', () => {
    const fields = { name: 'John', age: 30, email: 'john@example.com' }
    const allowedFields = { name: true }
    const result = filterAllowedFields(fields, allowedFields)
    expect(result).toEqual({ name: 'John' })
  })
})
