import { sendAdminInvitations, getAdminInvitations } from '#controllers/adminInvitation.js'
import { langMiddleware } from '#middlewares/appLanguage.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import express from 'express'

export const router = express.Router()

router.post('/', langMiddleware, asyncWrapper(sendAdminInvitations))
router.get('/', asyncWrapper(getAdminInvitations))
