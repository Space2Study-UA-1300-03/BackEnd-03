import {
  getSubjectNamesByCategoryId,
  getCategoryNames,
  getAllCategories,
  getCategoryById,
  createCategory
} from '#controllers/category.js'
import { createCategoryValidationSchema } from '#validation/schemas/createCategory.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { authMiddleware } from '#middlewares/auth.js'

import express from 'express'

export const router = express.Router()

router.use(asyncWrapper(authMiddleware))

router.get('/', asyncWrapper(getAllCategories))
router.get('/names', asyncWrapper(getCategoryNames))

router.param('id', idValidation)
router.get('/:id', asyncWrapper(getCategoryById))
router.get('/:id?/subjects/names', asyncWrapper(getSubjectNamesByCategoryId))

/**
 * @description Create a new category only for admin
 */
router.post('/', dataValidation(createCategoryValidationSchema), asyncWrapper(createCategory))
