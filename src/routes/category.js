import { getAllCategories, getCategoryById, getCategoryNames } from '#controllers/category.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'

import express from 'express'

export const router = express.Router()

router.get('/', asyncWrapper(getAllCategories))
router.get('/names', asyncWrapper(getCategoryNames))

router.param('id', idValidation)
router.get('/:id', asyncWrapper(getCategoryById))
