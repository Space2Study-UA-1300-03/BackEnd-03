import { emailSubject } from '#consts/emailSubject.js'
import { createError } from '#utils/errorsHelper.js'
import { tokenService } from '#services/token.js'
import { emailService } from '#services/email.js'
import { userService } from '#services/user.js'
import { tokenNames } from '#consts/auth.js'
import { errors } from '#consts/errors.js'
import { logger } from '#logger/logger.js'
import User from '#models/user.js'

const {
  INCORRECT_CREDENTIALS,
  EMAIL_NOT_CONFIRMED,
  BAD_CONFIRM_TOKEN,
  BAD_REFRESH_TOKEN,
  BAD_RESET_TOKEN,
  USER_NOT_FOUND
} = errors
const { getUserByEmail, createUser, privateUpdateUser, getUserById, hashPassword, varifyPassword } = userService
const { CONFIRM_TOKEN, REFRESH_TOKEN, RESET_TOKEN } = tokenNames

export const authService = {
  signup: async (role, firstName, lastName, email, password, language) => {
    const hashedPassword = await hashPassword(password)
    const user = await createUser(role, firstName, lastName, email, hashedPassword, language)

    const confirmToken = tokenService.generateConfirmToken({ id: user._id, role })
    await tokenService.saveToken(user._id, confirmToken, CONFIRM_TOKEN)
    await emailService.sendEmail(email, emailSubject.EMAIL_CONFIRMATION, language, { confirmToken, email, firstName })
    return {
      userId: user._id,
      userEmail: user.email
    }
  },

  login: async (email, password, isFromGoogle) => {
    const user = await getUserByEmail(email)

    if (!user) {
      throw createError(404, USER_NOT_FOUND)
    }

    const verifiedPassword = await varifyPassword(password, user.password)
    const checkedPassword = verifiedPassword || isFromGoogle

    if (!checkedPassword) {
      throw createError(401, INCORRECT_CREDENTIALS)
    }

    const { _id, lastLoginAs, isFirstLogin, isEmailConfirmed } = user

    if (!isEmailConfirmed) {
      throw createError(401, EMAIL_NOT_CONFIRMED)
    }

    const tokens = tokenService.generateTokens({ id: _id, role: lastLoginAs, isFirstLogin })
    await tokenService.saveToken(_id, tokens.refreshToken, REFRESH_TOKEN)

    if (isFirstLogin) {
      await privateUpdateUser(_id, { isFirstLogin: false })
    }

    await privateUpdateUser(_id, { lastLogin: new Date() })

    return tokens
  },

  logout: async (refreshToken) => {
    await tokenService.removeRefreshToken(refreshToken)
  },

  refreshAccessToken: async (refreshToken) => {
    const tokenData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken, REFRESH_TOKEN)

    if (!tokenData || !tokenFromDB) {
      throw createError(400, BAD_REFRESH_TOKEN)
    }

    const { _id, lastLoginAs, isFirstLogin } = await getUserById(tokenData.id)

    const tokens = tokenService.generateTokens({ id: _id, role: lastLoginAs, isFirstLogin })
    await tokenService.saveToken(_id, tokens.refreshToken, REFRESH_TOKEN)

    return tokens
  },

  sendResetPasswordEmail: async (email, language) => {
    const user = await getUserByEmail(email)

    if (!user) {
      throw createError(404, USER_NOT_FOUND)
    }

    const { _id, firstName } = user

    const resetToken = tokenService.generateResetToken({ id: _id, firstName, email })
    await tokenService.saveToken(_id, resetToken, RESET_TOKEN)

    await emailService.sendEmail(email, emailSubject.RESET_PASSWORD, language, { resetToken, email, firstName })
  },

  updatePassword: async (resetToken, password, language) => {
    const tokenData = tokenService.validateResetToken(resetToken)
    const tokenFromDB = await tokenService.findToken(resetToken, RESET_TOKEN)
    const hashedPassword = await hashPassword(password)

    if (!tokenData || !tokenFromDB) {
      throw createError(400, BAD_RESET_TOKEN.message)
    }

    const { id: userId, firstName, email } = tokenData
    await privateUpdateUser(userId, { password: hashedPassword })

    await tokenService.removeResetToken(userId)

    await emailService.sendEmail(email, emailSubject.SUCCESSFUL_PASSWORD_RESET, language, {
      firstName
    })
  },

  verifyEmail: async (confirmToken) => {
    if (!confirmToken) {
      throw createError(400, BAD_CONFIRM_TOKEN)
    }

    const tokenData = tokenService.validateConfirmToken(confirmToken)
    const tokenFromDB = await tokenService.findToken(confirmToken, CONFIRM_TOKEN)

    if (!tokenData || !tokenFromDB) {
      throw createError(400, BAD_CONFIRM_TOKEN)
    }
    if (tokenData.id !== tokenFromDB.user.toString()) {
      throw createError(400, BAD_CONFIRM_TOKEN)
    }

    await userService.emailVerification(tokenFromDB.user)
    await tokenService.removeConfirmToken(confirmToken)

    return { message: 'Email confirmed' }
  },

  googleLogin: async (payload) => {
    if (!payload?.email || !payload?.name) {
      throw new Error('Invalid payload: email and name are required')
    }

    const { email, name } = payload
    const [firstName, lastName] = name.split(' ')

    try {
      let user = await User.findOne({ email })

      if (!user) {
        user = new User({
          email,
          firstName,
          lastName: lastName || firstName,
          role: ['student'],
          isEmailConfirmed: true,
          password: '',
          authProvider: 'google'
        })

        await user.save()
      }

      return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        authProvider: user.authProvider
      }
    } catch (err) {
      logger.error('Error in google Login', err)
      throw err
    }
  }
}
