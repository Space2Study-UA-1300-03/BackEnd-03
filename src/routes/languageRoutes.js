import express from 'express'
import { getLanguages } from '#controllers/languageController.js'

export const router = express.Router()

router.get('/', getLanguages)
