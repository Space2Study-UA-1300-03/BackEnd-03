import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import mongoose from 'mongoose'

const mockCreateError = jest.fn((status, message) => {
  const error = new Error(message)
  error.status = status
  error.code = 'INVALID_ID'
  error.message = 'ID is invalid.'
  throw error
})

await jest.unstable_mockModule('#utils/errorsHelper.js', () => ({
  createError: mockCreateError
}))

const { idValidation } = await import('#middlewares/idValidation.js')
const { errors } = await import('#consts/errors.js')

const { INVALID_ID } = errors

describe('idValidation Middleware', () => {
  let req, res, next

  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
    mockCreateError.mockClear()
  })

  it('should call next() if ID is valid', () => {
    const validId = new mongoose.Types.ObjectId().toString()

    expect(() => idValidation(req, res, next, validId)).not.toThrow()
    expect(next).toHaveBeenCalled()
    expect(mockCreateError).not.toHaveBeenCalled()
  })

  it('should throw an error if ID is invalid', () => {
    const invalidId = 'invalid-id'

    try {
      idValidation(req, res, next, invalidId)
    } catch (error) {
      expect(error).toEqual(
        expect.objectContaining({
          message: 'ID is invalid.',
          status: 400,
          code: 'INVALID_ID' // перевіряємо код помилки
        })
      )
    }
    expect(mockCreateError).toHaveBeenCalledWith(400, INVALID_ID)
    expect(next).not.toHaveBeenCalled()
  })
})
