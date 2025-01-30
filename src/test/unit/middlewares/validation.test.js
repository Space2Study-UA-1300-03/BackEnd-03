import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { errors } from '#consts/errors.js'

const mockValidateRequired = jest.fn()
const mockValidateFunc = {
  required: jest.fn(),
  min: jest.fn(),
  max: jest.fn(),
  type: jest.fn()
}

jest.unstable_mockModule('#utils/validationHelper.js', () => ({
  validateRequired: mockValidateRequired,
  validateFunc: mockValidateFunc
}))

const mockCreateError = jest.fn((status, error) => {
  const err = new Error(error.message)
  err.status = status
  throw err
})

jest.unstable_mockModule('#utils/errorsHelper.js', () => ({
  createError: mockCreateError
}))

const { validationMiddleware } = await import('#middlewares/validation.js')

describe('validationMiddleware', () => {
  let req, res, next

  beforeEach(() => {
    req = {
      body: {}
    }
    res = {}
    next = jest.fn()

    jest.clearAllMocks()
  })

  it('should throw error if body is not defined', () => {
    req.body = undefined
    const middleware = validationMiddleware({})

    expect(() => middleware(req, res, next)).toThrow()
    expect(mockCreateError).toHaveBeenCalledWith(422, errors.BODY_IS_NOT_DEFINED)
    expect(next).not.toHaveBeenCalled()
  })

  it('should validate required fields', () => {
    const schema = {
      username: { required: true }
    }
    req.body = { username: 'testUser' }
    const middleware = validationMiddleware(schema)

    middleware(req, res, next)

    expect(mockValidateRequired).toHaveBeenCalledWith('username', true, 'testUser')
    expect(next).toHaveBeenCalled()
  })

  it('should validate multiple rules for a field', () => {
    const schema = {
      age: {
        required: true,
        type: 'number',
        min: 18,
        max: 100
      }
    }
    req.body = { age: 25 }
    const middleware = validationMiddleware(schema)

    middleware(req, res, next)

    expect(mockValidateRequired).toHaveBeenCalledWith('age', true, 25)
    expect(mockValidateFunc.type).toHaveBeenCalledWith('age', 'number', 25)
    expect(mockValidateFunc.min).toHaveBeenCalledWith('age', 18, 25)
    expect(mockValidateFunc.max).toHaveBeenCalledWith('age', 100, 25)
    expect(next).toHaveBeenCalled()
  })

  it('should skip validation for undefined optional fields', () => {
    const schema = {
      email: {
        type: 'string',
        required: false
      }
    }
    req.body = {}
    const middleware = validationMiddleware(schema)

    middleware(req, res, next)

    expect(mockValidateRequired).toHaveBeenCalledWith('email', false, undefined)
    expect(mockValidateFunc.type).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it('should validate multiple fields', () => {
    const schema = {
      username: { required: true, type: 'string' },
      age: { required: true, type: 'number' }
    }
    req.body = {
      username: 'testUser',
      age: 25
    }
    const middleware = validationMiddleware(schema)

    middleware(req, res, next)

    expect(mockValidateRequired).toHaveBeenCalledWith('username', true, 'testUser')
    expect(mockValidateRequired).toHaveBeenCalledWith('age', true, 25)
    expect(mockValidateFunc.type).toHaveBeenCalledWith('username', 'string', 'testUser')
    expect(mockValidateFunc.type).toHaveBeenCalledWith('age', 'number', 25)
    expect(next).toHaveBeenCalled()
  })

  it('should call next() if all validations pass', () => {
    const schema = {
      username: { required: true }
    }
    req.body = { username: 'testUser' }
    const middleware = validationMiddleware(schema)

    middleware(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })
})
