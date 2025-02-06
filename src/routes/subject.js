import { getAllSubjects, createSubjects } from '#controllers/subject.js'
import { createSubjectValidationSchema } from '#validation/schemas/createSubject.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import express from 'express'

export const router = express.Router()

router.get('/', asyncWrapper(getAllSubjects))

/**
 * @description Create a new subject only for admin
 */
router.post('/', dataValidation(createSubjectValidationSchema), asyncWrapper(createSubjects))
