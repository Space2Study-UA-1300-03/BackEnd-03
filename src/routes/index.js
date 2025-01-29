import { router as resourcesCategory } from '#routes/resourcesCategory.js'
import { router as adminInvitation } from '#routes/adminInvitation.js'
import { router as question } from '#routes/question.js'
import { router as email } from '#routes/email.js'
import { router as offer } from '#routes/offer.js'
import { router as auth } from '#routes/auth.js'
import { router as ping } from '#routes/ping.js'
import { router as user } from '#routes/user.js'
import express from 'express'

export const router = express.Router()

router.use('/ping', ping)
router.use('/auth', auth)
router.use('/users', user)
router.use('/send-email', email)
router.use('/admin-invitations', adminInvitation)
router.use('/questions', question)
router.use('/resources-categories', resourcesCategory)
router.use('/offers', offer)
