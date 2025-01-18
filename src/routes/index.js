import { router as ping } from '#routes/ping.js'
import express from 'express'

export const router = express.Router()

// const resourcesCategory = require('~/routes/resourcesCategory')
// const adminInvitation = require('~/routes/adminInvitation')
// const question = require('~/routes/question')
// const offer = require('~/routes/offer')
// const email = require('~/routes/email')
// const auth = require('~/routes/auth')
// const user = require('~/routes/user')
// const ping = require('~/routes/ping')

router.use('/ping', ping)

// router.use('/auth', auth)
// router.use('/users', user)
// router.use('/send-email', email)
// router.use('/admin-invitations', adminInvitation)
// router.use('/questions', question)
// router.use('/resources-categories', resourcesCategory)
// router.use('/offers', offer)
