import { jest, describe, it, beforeEach, expect } from '@jest/globals'

const mockCreateError = jest.fn((status, message) => {
  throw { status, ...message }
})

jest.unstable_mockModule('#utils/errorsHelper.js', () => ({
  createError: mockCreateError
}))

const { langMiddleware } = await import('#middlewares/appLanguage.js')
const { errors } = await import('#consts/errors.js')

describe('langMiddleware', () => {
  let req, res, next

  beforeEach(() => {
    req = { acceptsLanguages: jest.fn() }
    res = {}
    next = jest.fn()
    mockCreateError.mockClear()
  })

  it('should set req.lang and call next() if "en" language is valid', () => {
    req.acceptsLanguages.mockReturnValue('en')

    langMiddleware(req, res, next)

    expect(req.lang).toBe('en')
    expect(next).toHaveBeenCalled()
  })

  it('should set req.lang and call next() if "ua" language is valid', () => {
    req.acceptsLanguages.mockReturnValue('ua')

    langMiddleware(req, res, next)

    expect(req.lang).toBe('ua')
    expect(next).toHaveBeenCalled()
  })

  it('should throw an error if no valid language is accepted', () => {
    req.acceptsLanguages.mockReturnValue(false)

    expect(() => langMiddleware(req, res, next)).toThrow(errors.INVALID_LANGUAGE)
    expect(mockCreateError).toHaveBeenCalledWith(400, errors.INVALID_LANGUAGE)
  })
})
