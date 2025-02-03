import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { errors } from '#consts/errors.js'

const mockValidateAccessToken = jest.fn()
jest.unstable_mockModule('#services/token.js', () => ({
  tokenService: {
    validateAccessToken: mockValidateAccessToken
  }
}))

const mockCreateUnauthorizedError = jest.fn((status) => {
  const error = new Error(errors.UNAUTHORIZED.message)
  error.status = status || 401
  error.code = errors.UNAUTHORIZED.code
  throw error
})

jest.unstable_mockModule('#utils/errorsHelper.js', () => ({
  createUnauthorizedError: mockCreateUnauthorizedError
}))

const { tokenValidation } = await import('#utils/tokenValidation.js')

describe('tokenValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully validate token and return user data', () => {
    const mockUserData = {
      id: '123',
      email: 'test@example.com',
      role: 'user'
    }
    const mockToken = 'valid.access.token'

    mockValidateAccessToken.mockReturnValue(mockUserData)

    const result = tokenValidation(mockToken)

    expect(result).toEqual(mockUserData)
    expect(mockValidateAccessToken).toHaveBeenCalledTimes(1)
    expect(mockValidateAccessToken).toHaveBeenCalledWith(mockToken)
    expect(mockCreateUnauthorizedError).not.toHaveBeenCalled()
  })

  it('should successfully validate token with different user data structure', () => {
    const mockUserData = {
      userId: '456',
      permissions: ['read', 'write'],
      metadata: {
        lastLogin: '2024-01-31'
      }
    }
    const mockToken = 'valid.token.withmetadata'

    mockValidateAccessToken.mockReturnValue(mockUserData)

    const result = tokenValidation(mockToken)

    expect(result).toEqual(mockUserData)
    expect(mockValidateAccessToken).toHaveBeenCalledTimes(1)
    expect(mockValidateAccessToken).toHaveBeenCalledWith(mockToken)
    expect(mockCreateUnauthorizedError).not.toHaveBeenCalled()
  })

  it('should successfully validate token with minimal user data', () => {
    const mockUserData = {
      id: '789'
    }
    const mockToken = 'valid.minimal.token'

    mockValidateAccessToken.mockReturnValue(mockUserData)

    const result = tokenValidation(mockToken)

    expect(result).toEqual(mockUserData)
    expect(mockValidateAccessToken).toHaveBeenCalledTimes(1)
    expect(mockValidateAccessToken).toHaveBeenCalledWith(mockToken)
    expect(mockCreateUnauthorizedError).not.toHaveBeenCalled()
  })

  it('should successfully validate token with additional security fields', () => {
    const mockUserData = {
      id: '123',
      email: 'test@example.com',
      securityLevel: 'high',
      twoFactorEnabled: true,
      lastPasswordChange: '2024-01-31'
    }
    const mockToken = 'valid.secure.token'

    mockValidateAccessToken.mockReturnValue(mockUserData)

    const result = tokenValidation(mockToken)

    expect(result).toEqual(mockUserData)
    expect(mockValidateAccessToken).toHaveBeenCalledTimes(1)
    expect(mockValidateAccessToken).toHaveBeenCalledWith(mockToken)
    expect(mockCreateUnauthorizedError).not.toHaveBeenCalled()
  })

  it('should throw unauthorized error when token is not provided', () => {
    expect(() => tokenValidation(null)).toThrow(errors.UNAUTHORIZED.message)
    expect(mockValidateAccessToken).not.toHaveBeenCalled()
    expect(mockCreateUnauthorizedError).toHaveBeenCalledTimes(1)
  })

  it('should throw unauthorized error when token validation fails', () => {
    const invalidToken = 'invalid.token'
    mockValidateAccessToken.mockReturnValue(null)

    expect(() => tokenValidation(invalidToken)).toThrow(errors.UNAUTHORIZED.message)
    expect(mockValidateAccessToken).toHaveBeenCalledWith(invalidToken)
    expect(mockCreateUnauthorizedError).toHaveBeenCalledTimes(1)
  })
})
