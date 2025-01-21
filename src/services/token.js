import { createError } from '#utils/errorsHelper.js'
import { tokenNames } from '#consts/auth.js'
import { config } from '#configs/config.js'
import { errors } from '#consts/errors.js'
import Token from '#models/token.js'
import jwt from 'jsonwebtoken'

export const tokenService = {
  generateTokens: (payload) => {
    const accessToken = jwt.sign(payload, config.all.JWT_ACCESS_SECRET, {
      expiresIn: config.all.JWT_ACCESS_EXPIRES_IN
    })

    const refreshToken = jwt.sign(payload, config.all.JWT_REFRESH_SECRET, {
      expiresIn: config.all.JWT_REFRESH_EXPIRES_IN
    })

    return {
      accessToken,
      refreshToken
    }
  },

  generateResetToken: (payload) => {
    return jwt.sign(payload, config.all.JWT_RESET_SECRET, {
      expiresIn: config.all.JWT_RESET_EXPIRES_IN
    })
  },

  generateConfirmToken: (payload) => {
    return jwt.sign(payload, config.all.JWT_CONFIRM_SECRET, {
      expiresIn: config.all.JWT_CONFIRM_EXPIRES_IN
    })
  },

  validateToken: (token, secret) => {
    try {
      return jwt.verify(token, secret)
    } catch (e) {
      return null
    }
  },

  validateAccessToken: (token) => {
    return tokenService.validateToken(token, config.all.JWT_ACCESS_SECRET)
  },

  validateRefreshToken: (token) => {
    return tokenService.validateToken(token, config.all.JWT_REFRESH_SECRET)
  },

  validateResetToken: (token) => {
    return tokenService.validateToken(token, config.all.JWT_RESET_SECRET)
  },

  validateConfirmToken: (token) => {
    return tokenService.validateToken(token, config.all.JWT_CONFIRM_SECRET)
  },

  saveToken: async (userId, tokenValue, tokenName) => {
    if (!Object.values(tokenNames).includes(tokenName)) {
      throw createError(404, errors.INVALID_TOKEN_NAME)
    }

    let tokenData = await Token.findOne({ user: userId })

    try {
      tokenData = await Token.findOne({ user: userId }).exec()
      tokenData[tokenName] = tokenValue

      return tokenData.save()
    } catch (error) {
      return await Token.create({ user: userId, [tokenName]: tokenValue })
    }
  },

  findToken: async (tokenValue, tokenName) => {
    if (!Object.values(tokenNames).includes(tokenName)) {
      throw createError(404, errors.INVALID_TOKEN_NAME)
    }

    try {
      const token = await Token.find({ [tokenName]: tokenValue }).exec()
      return token[0]
    } catch (error) {
      return null
    }
  },

  findTokensWithUsersByParams: async (params) => {
    return Token.find(params).populate('user').lean().exec()
  },

  removeRefreshToken: async (refreshToken) => {
    await Token.deleteOne({ refreshToken })
  },

  removeResetToken: async (userId) => {
    await Token.updateOne({ user: userId }, { $set: { resetToken: null } })
  },

  removeConfirmToken: async (confirmToken) => {
    await Token.deleteOne({ confirmToken })
  }
}
