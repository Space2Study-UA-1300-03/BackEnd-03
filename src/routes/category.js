import { getAllCategories, getCategoryById } from '#controllers/category.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'

import express from 'express'

export const router = express.Router()

router.param('id', idValidation)

router.get('/', asyncWrapper(getAllCategories))
router.get('/:id', asyncWrapper(getCategoryById))
