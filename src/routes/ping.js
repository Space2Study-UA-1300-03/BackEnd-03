import { ping } from '#src/controllers/ping.js'
import express from 'express'

export const router = express.Router()

router.get('/', ping)
