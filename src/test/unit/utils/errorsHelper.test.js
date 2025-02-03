import {
  createUnauthorizedError,
  createBadRequestError,
  createForbiddenError,
  createNotFoundError,
  createError
} from '#utils/errorsHelper.js'
import { describe, it, expect } from '@jest/globals'
import { errors } from '#consts/errors.js'

const { UNAUTHORIZED, NOT_FOUND, FORBIDDEN, BAD_REQUEST } = errors

describe('Error creation functions', () => {
  it('should create a custom error with status and message', () => {
    const errorInfo = { message: 'Custom error', code: 'CUSTOM_ERROR' }
    const error = createError(500, errorInfo)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(errorInfo.message)
    expect(error.status).toBe(500)
    expect(error.code).toBe(errorInfo.code)
  })

  it('should create an unauthorized error', () => {
    const error = createUnauthorizedError()
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(UNAUTHORIZED.message)
    expect(error.status).toBe(401)
    expect(error.code).toBe(UNAUTHORIZED.code)
  })

  it('should create a forbidden error', () => {
    const error = createForbiddenError()
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(FORBIDDEN.message)
    expect(error.status).toBe(403)
    expect(error.code).toBe(FORBIDDEN.code)
  })

  it('should create a not found error', () => {
    const error = createNotFoundError()
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(NOT_FOUND.message)
    expect(error.status).toBe(404)
    expect(error.code).toBe(NOT_FOUND.code)
  })

  it('should create a bad request error', () => {
    const error = createBadRequestError()
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(BAD_REQUEST.message)
    expect(error.status).toBe(400)
    expect(error.code).toBe(BAD_REQUEST.code)
  })
})
