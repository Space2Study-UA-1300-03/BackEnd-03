import { getAllCategories, getCategoryById, getCategoryNames, createCategory } from '#controllers/category.js'
import { createCategoryValidationSchema } from '#validation/schemas/createCategory.js'
import { validationMiddleware } from '#middlewares/validation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'

import express from 'express'

export const router = express.Router()

router.get('/', asyncWrapper(getAllCategories))
router.get('/names', asyncWrapper(getCategoryNames))

router.param('id', idValidation)
router.get('/:id', asyncWrapper(getCategoryById))

/**
 * @description Create a new category only for admin
 */
router.post('/', validationMiddleware(createCategoryValidationSchema), asyncWrapper(createCategory))
