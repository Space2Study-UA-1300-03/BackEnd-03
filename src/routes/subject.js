import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { getAllSubjects } from '#controllers/subject.js'
import express from 'express'

export const router = express.Router()

router.get('/', asyncWrapper(getAllSubjects))
