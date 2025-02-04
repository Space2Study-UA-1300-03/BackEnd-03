// import { authMiddleware } from '#middlewares/auth.js'
import { getAllCategories } from '#controllers/category.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import express from 'express'

export const router = express.Router()
// router.use(authMiddleware)

router.get('/', asyncWrapper(getAllCategories))
