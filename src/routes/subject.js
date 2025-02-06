import { getAllSubjects, createSubjects } from '#controllers/subject.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import express from 'express'

export const router = express.Router()

router.get('/', asyncWrapper(getAllSubjects))

/**
 * @description Create a new category only for admin
 */
router.post('/', asyncWrapper(createSubjects))
