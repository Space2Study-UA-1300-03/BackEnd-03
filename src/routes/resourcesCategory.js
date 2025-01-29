import {
  getResourcesCategoriesNames,
  deleteResourceCategory,
  getResourcesCategories,
  updateResourceCategory,
  createResourcesCategory
} from '#controllers/resourcesCategory.js'
import { authMiddleware, restrictTo } from '#middlewares/auth.js'
import { isEntityValid } from '#middlewares/entityValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import ResourceCategory from '#models/resourcesCategory.js'
import { roles } from '#consts/auth.js'
import express from 'express'

const { TUTOR } = roles

export const router = express.Router()

const params = [{ model: ResourceCategory, idName: 'id' }]
router.param('id', idValidation)

router.use(authMiddleware)
router.use(restrictTo(TUTOR))
router.get('/', asyncWrapper(getResourcesCategories))
router.get('/names', asyncWrapper(getResourcesCategoriesNames))
router.post('/', asyncWrapper(createResourcesCategory))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(updateResourceCategory))
router.delete('/:id', isEntityValid({ params }), asyncWrapper(deleteResourceCategory))
