import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { errors } from '#consts/errors.js'
import mongoose from 'mongoose'

const mockCreateError = jest.fn((status, error) => {
  const err = new Error(error.message)
  err.status = status
  return err
})

jest.unstable_mockModule('#utils/errorsHelper.js', () => ({
  createError: mockCreateError
}))

const { isEntityValid } = await import('#middlewares/entityValidation.js')

describe('isEntityValid Middleware', () => {
  let req, res, next
  let UserModel, PostModel

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    }
    res = {}
    next = jest.fn()
    mockCreateError.mockClear()

    // Створюємо моки для mongoose моделей
    UserModel = {
      findById: jest.fn(),
      modelName: 'User'
    }

    PostModel = {
      findById: jest.fn(),
      modelName: 'Post'
    }
  })

  it('should pass if no entities config provided', async () => {
    const middleware = isEntityValid({})
    await middleware(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(mockCreateError).not.toHaveBeenCalled()
  })

  describe('Params Validation', () => {
    it('should validate single param entity successfully', async () => {
      const validId = new mongoose.Types.ObjectId().toString()
      req.params = { userId: validId }

      UserModel.findById.mockResolvedValueOnce({ _id: validId })

      const middleware = isEntityValid({
        params: [{ model: UserModel, idName: 'userId' }]
      })

      await middleware(req, res, next)

      expect(UserModel.findById).toHaveBeenCalledWith(validId)
      expect(next).toHaveBeenCalledTimes(1)
      expect(mockCreateError).not.toHaveBeenCalled()
    })

    it('should handle non-existent param entity', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString()
      req.params = { userId: invalidId }

      UserModel.findById.mockResolvedValueOnce(null)

      const middleware = isEntityValid({
        params: [{ model: UserModel, idName: 'userId' }]
      })

      await middleware(req, res, next)

      expect(UserModel.findById).toHaveBeenCalledWith(invalidId)
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 404,
          message: errors.DOCUMENT_NOT_FOUND(['User']).message
        })
      )
    })

    it('should skip validation if param id is not provided', async () => {
      req.params = {}

      const middleware = isEntityValid({
        params: [{ model: UserModel, idName: 'userId' }]
      })

      await middleware(req, res, next)

      expect(UserModel.findById).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalledTimes(1)
      expect(mockCreateError).not.toHaveBeenCalled()
    })
  })

  describe('Body Validation', () => {
    it('should validate single body entity successfully', async () => {
      const validId = new mongoose.Types.ObjectId().toString()
      req.body = { postId: validId }

      PostModel.findById.mockResolvedValueOnce({ _id: validId })

      const middleware = isEntityValid({
        body: [{ model: PostModel, idName: 'postId' }]
      })

      await middleware(req, res, next)

      expect(PostModel.findById).toHaveBeenCalledWith(validId)
      expect(next).toHaveBeenCalledTimes(1)
      expect(mockCreateError).not.toHaveBeenCalled()
    })

    it('should validate array of ids in body', async () => {
      const validIds = [new mongoose.Types.ObjectId().toString(), new mongoose.Types.ObjectId().toString()]
      req.body = { postIds: validIds }

      PostModel.findById.mockResolvedValueOnce({ _id: validIds[0] }).mockResolvedValueOnce({ _id: validIds[1] })

      const middleware = isEntityValid({
        body: [{ model: PostModel, idName: 'postIds' }]
      })

      await middleware(req, res, next)

      expect(PostModel.findById).toHaveBeenCalledTimes(2)
      expect(PostModel.findById).toHaveBeenCalledWith(validIds[0])
      expect(PostModel.findById).toHaveBeenCalledWith(validIds[1])
      expect(next).toHaveBeenCalledTimes(1)
      expect(mockCreateError).not.toHaveBeenCalled()
    })

    it('should handle non-existent entities in body array', async () => {
      const ids = [new mongoose.Types.ObjectId().toString(), new mongoose.Types.ObjectId().toString()]
      req.body = { postIds: ids }

      PostModel.findById.mockResolvedValueOnce(null).mockResolvedValueOnce(null)

      const middleware = isEntityValid({
        body: [{ model: PostModel, idName: 'postIds' }]
      })

      await middleware(req, res, next)

      expect(PostModel.findById).toHaveBeenCalledTimes(2)
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 404,
          message: errors.DOCUMENT_NOT_FOUND(['Post']).message
        })
      )
    })
  })

  it('should handle multiple entities validation', async () => {
    const userId = new mongoose.Types.ObjectId().toString()
    const postId = new mongoose.Types.ObjectId().toString()

    req.params = { userId }
    req.body = { postId }

    UserModel.findById.mockResolvedValueOnce({ _id: userId })
    PostModel.findById.mockResolvedValueOnce(null)

    const middleware = isEntityValid({
      params: [{ model: UserModel, idName: 'userId' }],
      body: [{ model: PostModel, idName: 'postId' }]
    })

    await middleware(req, res, next)

    expect(UserModel.findById).toHaveBeenCalledWith(userId)
    expect(PostModel.findById).toHaveBeenCalledWith(postId)
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 404,
        message: errors.DOCUMENT_NOT_FOUND(['Post']).message
      })
    )
  })
})
