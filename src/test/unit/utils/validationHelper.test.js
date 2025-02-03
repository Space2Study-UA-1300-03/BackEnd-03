import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { errors } from '#consts/errors.js'

const mockCreateError = jest.fn((status, message) => {
  const error = new Error(message)
  error.status = status
  throw error
})

jest.unstable_mockModule('#utils/errorsHelper.js', () => ({
  createError: mockCreateError
}))

const { validateFunc } = await import('#utils/validationHelper.js')

describe('Validation functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if a required field is missing', () => {
    expect(() => validateFunc.required('username', true, '')).toThrow()
    expect(mockCreateError).toHaveBeenCalledWith(422, errors.FIELD_IS_NOT_DEFINED('username'))
  })

  it('should not throw an error if a required field is provided', () => {
    expect(() => validateFunc.required('username', true, 'JohnDoe')).not.toThrow()
  })

  it('should throw an error if the field type does not match', () => {
    expect(() => validateFunc.type('age', 'number', 'not-a-number')).toThrow()
    expect(mockCreateError).toHaveBeenCalledWith(422, errors.FIELD_IS_NOT_OF_PROPER_TYPE('age', 'number'))
  })

  it('should not throw an error if the field type matches', () => {
    expect(() => validateFunc.type('age', 'number', 25)).not.toThrow()
  })

  it('should throw an error if the field length is out of range', () => {
    expect(() => validateFunc.length('password', { min: 6, max: 12 }, '123')).toThrow()
    expect(mockCreateError).toHaveBeenCalledWith(
      422,
      errors.FIELD_IS_NOT_OF_PROPER_LENGTH('password', { min: 6, max: 12 })
    )
  })

  it('should not throw an error if the field length is within range', () => {
    expect(() => validateFunc.length('password', { min: 6, max: 12 }, 'password123')).not.toThrow()
  })

  it('should throw an error if the field does not match regex', () => {
    expect(() => validateFunc.regex('email', /^[a-z]+@[a-z]+\.[a-z]+$/, 'invalid-email')).toThrow()
    expect(mockCreateError).toHaveBeenCalledWith(422, errors.FIELD_IS_NOT_OF_PROPER_FORMAT('email'))
  })

  it('should not throw an error if the field matches regex', () => {
    expect(() => validateFunc.regex('email', /^[a-z]+@[a-z]+\.[a-z]+$/, 'test@example.com')).not.toThrow()
  })

  it('should throw an error if the field is not in enum values', () => {
    expect(() => validateFunc.enum('role', ['admin', 'user'], 'guest')).toThrow()
    expect(mockCreateError).toHaveBeenCalledWith(
      422,
      errors.FIELD_IS_NOT_OF_PROPER_ENUM_VALUE('role', ['admin', 'user'])
    )
  })

  it('should not throw an error if the field is in enum values', () => {
    expect(() => validateFunc.enum('role', ['admin', 'user'], 'user')).not.toThrow()
  })
})
