import { getAllSubjects, getAllSubjectsNames, createSubjects, getSubjectById } from '#controllers/subject.js'
import { createSubjectValidationSchema } from '#validation/schemas/createSubject.js'
import { authMiddleware, restrictTo } from '#middlewares/auth.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { roles } from '#consts/auth.js'
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
router.use(asyncWrapper(restrictTo(roles.ADMIN, roles.SUPERADMIN)))
router.post('/', dataValidation(createSubjectValidationSchema), asyncWrapper(createSubjects))
