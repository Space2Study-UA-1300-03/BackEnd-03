import { createSubjectValidationSchema } from '#validation/schemas/createSubject.js'
import { getAllSubjects, createSubjects, getSubjectById } from '#controllers/subject.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import express from 'express'

export const router = express.Router()

router.get('/', asyncWrapper(getAllSubjects))

router.param('id', idValidation)
router.get('/:id', asyncWrapper(getSubjectById))

/**
 * @description Create a new subject only for admin
 */
router.post('/', dataValidation(createSubjectValidationSchema), asyncWrapper(createSubjects))
