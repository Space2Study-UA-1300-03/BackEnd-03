import { getAllCategories, getCategoryById } from '#controllers/category.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import express from 'express'

export const router = express.Router()

router.get('/', asyncWrapper(getAllCategories))
router.get('/:id', asyncWrapper(getCategoryById))
