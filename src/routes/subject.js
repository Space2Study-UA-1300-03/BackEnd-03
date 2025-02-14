import { createSubjectValidationSchema } from '#validation/schemas/createSubject.js'
import { getAllSubjects, getAllSubjectsNames, createSubjects, getSubjectById } from '#controllers/subject.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { authMiddleware } from '#middlewares/auth.js'
import express from 'express'

export const router = express.Router()

router.use(asyncWrapper(authMiddleware))

router.get('/', asyncWrapper(getAllSubjects))
router.get('/names', asyncWrapper(getAllSubjectsNames))

router.param('id', idValidation)
router.get('/:id', asyncWrapper(getSubjectById))

/**
 * @description Create a new subject only for admin
 */
router.post('/', dataValidation(createSubjectValidationSchema), asyncWrapper(createSubjects))
