import { login, logout, refreshAccessToken, sendResetPasswordEmail, updatePassword, signup } from '#controllers/auth.js'
import { forgotPasswordValidationSchema } from '#validation/schemas/forgotPassword.js'
import { resetPasswordValidationSchema } from '#validation/schemas/resetPassword.js'
import { signupValidationSchema } from '#validation/schemas/signup.js'
import { loginValidationSchema } from '#validation/schemas/login.js'
import { validationMiddleware } from '#middlewares/validation.js'
import { langMiddleware } from '#middlewares/appLanguage.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import express from 'express'

export const router = express.Router()

router.post('/signup', validationMiddleware(signupValidationSchema), langMiddleware, asyncWrapper(signup))
router.post('/login', validationMiddleware(loginValidationSchema), asyncWrapper(login))
router.post('/logout', asyncWrapper(logout))
router.get('/refresh', asyncWrapper(refreshAccessToken))
router.post(
  '/forgot-password',
  validationMiddleware(forgotPasswordValidationSchema),
  langMiddleware,
  asyncWrapper(sendResetPasswordEmail)
)
router.patch(
  '/reset-password/:token',
  validationMiddleware(resetPasswordValidationSchema),
  langMiddleware,
  asyncWrapper(updatePassword)
)
