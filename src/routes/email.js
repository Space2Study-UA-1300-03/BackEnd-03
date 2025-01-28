import { langMiddleware } from '#middlewares/appLanguage.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { sendEmail } from '#controllers/email.js'
import express from 'express'

export const router = express.Router()

router.post('/', langMiddleware, asyncWrapper(sendEmail))
