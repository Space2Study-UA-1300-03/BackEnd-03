import { getMe, deleteUser, updateUser, updateStatus } from '#controllers/user.js'
import { authMiddleware, restrictTo } from '#middlewares/auth.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { roles } from '#consts/auth.js'
import express from 'express'

const { ADMIN } = roles

export const router = express.Router()

router.use(asyncWrapper(authMiddleware))
router.patch('/', asyncWrapper(updateUser))
router.get('/me', asyncWrapper(getMe))

/**
 * @todo update this block
 */
router.param('id', idValidation)
router.use(restrictTo(ADMIN))
router.patch('/:id/change-status', asyncWrapper(updateStatus))
router.delete('/:id', asyncWrapper(deleteUser))
