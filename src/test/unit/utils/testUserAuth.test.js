import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import mongoose from 'mongoose'

const mockCreate = jest.fn()
jest.unstable_mockModule('#models/user.js', () => ({
  default: { create: mockCreate }
}))

const mockPost = jest.fn()
const mockApp = {
  post: jest.fn(() => ({
    send: mockPost
  }))
}

const { testUserAuthentication } = await import('#utils/testUserAuth.js')

describe('testUserAuthentication', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create user and return access token with default test user data', async () => {
    const mockAccessToken = 'mock.access.token'
    const defaultTestUser = {
      role: 'student',
      firstName: 'Tart',
      lastName: 'Drilling',
      email: 'tartdrilling@gmail.com',
      password: 'Qwerty123@',
      FAQ: { student: [{ question: 'question1', answer: 'answer1' }] },
      isEmailConfirmed: true,
      lastLoginAs: 'student'
    }

    mockPost.mockResolvedValue({
      body: { accessToken: mockAccessToken }
    })

    const result = await testUserAuthentication(mockApp, {})

    expect(mockCreate).toHaveBeenCalledWith(defaultTestUser)

    expect(mockApp.post).toHaveBeenCalledWith('/auth/login')
    expect(mockPost).toHaveBeenCalledWith({
      email: defaultTestUser.email,
      password: defaultTestUser.password
    })

    expect(result).toBe(mockAccessToken)
  })

  it('should create user with custom role', async () => {
    const mockAccessToken = 'mock.access.token'
    const customRole = 'teacher'
    const testUser = { role: customRole }

    const expectedUser = {
      role: customRole,
      firstName: 'Tart',
      lastName: 'Drilling',
      email: 'tartdrilling@gmail.com',
      password: 'Qwerty123@',
      FAQ: { student: [{ question: 'question1', answer: 'answer1' }] },
      isEmailConfirmed: true,
      lastLoginAs: customRole
    }

    mockPost.mockResolvedValue({
      body: { accessToken: mockAccessToken }
    })

    const result = await testUserAuthentication(mockApp, testUser)

    expect(mockCreate).toHaveBeenCalledWith(expectedUser)
    expect(mockApp.post).toHaveBeenCalledWith('/auth/login')
    expect(mockPost).toHaveBeenCalledWith({
      email: expectedUser.email,
      password: expectedUser.password
    })
    expect(result).toBe(mockAccessToken)
  })

  it('should use provided custom user data when all mandatory fields are present', async () => {
    const mockAccessToken = 'mock.access.token'
    const customUser = {
      role: 'admin',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'StrongPass123!',
      FAQ: { admin: [{ question: 'custom', answer: 'custom' }] },
      isEmailConfirmed: true,
      lastLoginAs: 'admin'
    }

    mockPost.mockResolvedValue({
      body: { accessToken: mockAccessToken }
    })

    const result = await testUserAuthentication(mockApp, customUser)

    expect(mockCreate).toHaveBeenCalledWith(customUser)
    expect(mockApp.post).toHaveBeenCalledWith('/auth/login')
    expect(mockPost).toHaveBeenCalledWith({
      email: customUser.email,
      password: customUser.password
    })
    expect(result).toBe(mockAccessToken)
  })

  it('should handle login response with additional data', async () => {
    const mockAccessToken = 'mock.access.token'
    const mockLoginResponse = {
      body: {
        accessToken: mockAccessToken,
        user: {
          id: new mongoose.Types.ObjectId().toString(),
          email: 'tartdrilling@gmail.com',
          role: 'student'
        }
      }
    }

    mockPost.mockResolvedValue(mockLoginResponse)

    const result = await testUserAuthentication(mockApp, {})

    expect(result).toBe(mockAccessToken)
  })

  it('should create user with minimal required fields', async () => {
    const mockAccessToken = 'mock.access.token'
    const minimalUser = {
      role: 'student',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'Pass123!',
      isEmailConfirmed: true
    }

    mockPost.mockResolvedValue({
      body: { accessToken: mockAccessToken }
    })

    const result = await testUserAuthentication(mockApp, minimalUser)

    expect(mockCreate).toHaveBeenCalledWith(minimalUser)
    expect(mockPost).toHaveBeenCalledWith({
      email: minimalUser.email,
      password: minimalUser.password
    })
    expect(result).toBe(mockAccessToken)
  })
})
