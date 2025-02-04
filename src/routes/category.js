// import { authMiddleware } from '#middlewares/auth.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { getCategories } from '#controllers/category.js'
import express from 'express'

export const router = express.Router()
// router.use(authMiddleware)

router.get('/', asyncWrapper(getCategories))
