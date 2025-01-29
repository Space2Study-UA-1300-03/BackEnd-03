import { getUsers, getUserById, deleteUser, updateUser, updateStatus } from '#controllers/user.js'
import { authMiddleware, restrictTo } from '#middlewares/auth.js'
import { isEntityValid } from '#middlewares/entityValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { roles } from '#consts/auth.js'
import User from '#models/user.js'
import express from 'express'

const { ADMIN } = roles

export const router = express.Router()

const params = [{ model: User, idName: 'id' }]

router.use(authMiddleware)

router.param('id', idValidation)

router.get('/', asyncWrapper(getUsers))
router.get('/:id', isEntityValid({ params }), asyncWrapper(getUserById))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(updateUser))

router.use(restrictTo(ADMIN))
router.patch('/:id/change-status', isEntityValid({ params }), asyncWrapper(updateStatus))
router.delete('/:id', isEntityValid({ params }), asyncWrapper(deleteUser))
