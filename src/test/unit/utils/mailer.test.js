import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { errors } from '#consts/errors.js'

jest.unstable_mockModule('#configs/config.js', () => ({
  gmailCredentials: {
    user: 'test@gmail.com',
    clientId: 'testClientId',
    clientSecret: 'testSecret',
    refreshToken: 'testRefreshToken',
    redirectUri: 'testUri'
  }
}))

jest.unstable_mockModule('#logger/logger.js', () => ({
  logger: {
    error: jest.fn()
  }
}))

const mockTransport = jest.fn()
jest.unstable_mockModule('nodemailer', () => ({
  default: {
    createTransport: mockTransport
  }
}))

const mockSetCredentials = jest.fn()
const mockGetAccessToken = jest.fn()

jest.unstable_mockModule('googleapis', () => ({
  google: {
    auth: {
      OAuth2: jest.fn(() => ({
        setCredentials: mockSetCredentials,
        getAccessToken: mockGetAccessToken
      }))
    }
  }
}))

const { getAccessToken, createTransport, sendMail } = await import('#utils/mailer.js')
const { logger } = await import('#logger/logger.js')

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAccessToken', () => {
    it('should successfully retrieve access token', async () => {
      const mockToken = { token: 'test-access-token' }
      mockGetAccessToken.mockResolvedValue(mockToken)

      const result = await getAccessToken()

      expect(mockSetCredentials).toHaveBeenCalledWith({
        refresh_token: 'testRefreshToken'
      })
      expect(mockGetAccessToken).toHaveBeenCalled()
      expect(result).toBe(mockToken)
    })

    it('should throw error when access token retrieval fails', async () => {
      mockGetAccessToken.mockRejectedValue(new Error('Token retrieval failed'))

      await expect(getAccessToken()).rejects.toThrow(errors.API_TOKEN_NOT_RETRIEVED)
      expect(logger.error).toHaveBeenCalled()
    })
  })

  describe('createTransport', () => {
    it('should create transport with correct configuration', async () => {
      const mockToken = { token: 'test-access-token' }
      mockGetAccessToken.mockResolvedValue(mockToken)
      const mockTransporter = { verify: jest.fn() }
      mockTransport.mockReturnValue(mockTransporter)

      const result = await createTransport()

      expect(mockTransport).toHaveBeenCalledWith({
        service: 'gmail',
        secure: true,
        auth: {
          type: 'OAuth2',
          user: 'test@gmail.com',
          clientId: 'testClientId',
          clientSecret: 'testSecret',
          refreshToken: 'testRefreshToken',
          accessToken: mockToken
        }
      })
      expect(result).toBe(mockTransporter)
    })

    it('should handle transport creation error', async () => {
      mockGetAccessToken.mockRejectedValue(new Error('Transport creation failed'))

      const result = await createTransport()

      expect(logger.error).toHaveBeenCalled()
      expect(result).toBeUndefined()
    })
  })

  describe('sendMail', () => {
    it('should successfully send email', async () => {
      const mockToken = { token: 'test-access-token' }
      mockGetAccessToken.mockResolvedValue(mockToken)

      const mockTransporter = {
        verify: jest.fn().mockResolvedValue(true),
        sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
        close: jest.fn()
      }
      mockTransport.mockReturnValue(mockTransporter)

      const mailOptions = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Content'
      }

      const result = await sendMail(mailOptions)

      expect(mockTransporter.verify).toHaveBeenCalled()
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(mailOptions)
      expect(mockTransporter.close).toHaveBeenCalled()
      expect(result).toEqual({ messageId: 'test-id' })
    })

    it('should handle email sending error', async () => {
      const mockTransporter = {
        verify: jest.fn().mockRejectedValue(new Error('Verification failed')),
        close: jest.fn()
      }
      mockTransport.mockReturnValue(mockTransporter)

      const mockToken = { token: 'test-access-token' }
      mockGetAccessToken.mockResolvedValue(mockToken)

      const mailOptions = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Content'
      }

      await expect(sendMail(mailOptions)).rejects.toThrow(errors.EMAIL_NOT_SENT)
      expect(logger.error).toHaveBeenCalled()
      expect(mockTransporter.close).not.toHaveBeenCalled()
    })

    it('should handle transport creation failure', async () => {
      mockGetAccessToken.mockRejectedValue(new Error('Token retrieval failed'))
      mockTransport.mockReturnValue(null)

      const mailOptions = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Content'
      }

      await expect(sendMail(mailOptions)).rejects.toThrow(errors.EMAIL_NOT_SENT)
      expect(logger.error).toHaveBeenCalled()
    })
  })
})
