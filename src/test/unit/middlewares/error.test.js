import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { errors } from '#consts/errors.js'

const mockGetUniqueFields = jest.fn((message) => ['email', 'username'])

jest.unstable_mockModule('#utils/getUniqueFields.js', () => ({
  getUniqueFields: mockGetUniqueFields
}))

jest.unstable_mockModule('#logger/logger.js', () => ({
  logger: { error: jest.fn() }
}))

const { errorMiddleware } = await import('#middlewares/error.js')

const { INTERNAL_SERVER_ERROR, DOCUMENT_ALREADY_EXISTS, MONGO_SERVER_ERROR, VALIDATION_ERROR } = errors

describe('errorMiddleware', () => {
  let req, res, next

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()

    mockGetUniqueFields.mockClear()
  })

  it('should handle MongoServerError with duplicate key (code 11000)', () => {
    const err = {
      name: 'MongoServerError',
      code: 11000,
      message: 'duplicate key error: email_1 dup key'
    }

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      ...DOCUMENT_ALREADY_EXISTS(['email', 'username'])
    })
  })

  it('should handle MongoServerError with other error codes', () => {
    const err = {
      name: 'MongoServerError',
      code: 12000,
      message: 'Some mongo error'
    }

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      ...MONGO_SERVER_ERROR('Some mongo error')
    })
  })

  it('should handle ValidationError', () => {
    const err = {
      name: 'ValidationError',
      message: 'Validation failed'
    }

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      ...VALIDATION_ERROR('Validation failed')
    })
  })

  it('should handle unknown error without status and code', () => {
    const err = {
      message: 'Unknown error'
    }

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      code: INTERNAL_SERVER_ERROR.code,
      message: 'Unknown error'
    })
  })

  it('should handle error with custom status and code', () => {
    const err = {
      status: 404,
      code: 'NOT_FOUND',
      message: 'Resource not found'
    }

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      code: 'NOT_FOUND',
      message: 'Resource not found'
    })
  })
})
