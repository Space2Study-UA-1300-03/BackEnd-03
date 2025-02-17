import {
  getSubjectNamesByCategoryId,
  getSubjectByCategoryId,
  getCategoryNames,
  getAllCategories,
  getCategoryById,
  createCategory
} from '#controllers/category.js'
import { createCategoryValidationSchema } from '#validation/schemas/createCategory.js'
import { authMiddleware, restrictTo } from '#middlewares/auth.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { roles } from '#consts/auth.js'

import express from 'express'

export const router = express.Router()

router.use(asyncWrapper(authMiddleware))

router.get('/', asyncWrapper(getAllCategories))
router.get('/names', asyncWrapper(getCategoryNames))

router.get('/:id?/subjects', asyncWrapper(getSubjectByCategoryId))
router.get('/:id?/subjects/names', asyncWrapper(getSubjectNamesByCategoryId))
router.get('/:id', idValidation, asyncWrapper(getCategoryById))

/**
 * @description Create a new category only for admin
 */
router.use(asyncWrapper(restrictTo(roles.ADMIN, roles.SUPERADMIN)))
router.post('/', dataValidation(createCategoryValidationSchema), asyncWrapper(createCategory))
