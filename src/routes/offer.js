import { getOffers, createOffer, updateOffer, deleteOffer, getOfferById } from '#controllers/offer.js'
import { isEntityValid } from '#middlewares/entityValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { authMiddleware } from '#middlewares/auth.js'
import Offer from '#models/offer.js'
import express from 'express'

export const router = express.Router({ mergeParams: true })

const body = [
  { model: Offer, idName: 'categoryId' },
  { model: Offer, idName: 'subjectId' }
]
const params = [{ model: Offer, idName: 'id' }]

router.use(authMiddleware)

router.param('id', idValidation)

router.get('/', asyncWrapper(getOffers))
router.post('/', isEntityValid({ body }), asyncWrapper(createOffer))
router.get('/:id', isEntityValid({ params }), asyncWrapper(getOfferById))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(updateOffer))
router.delete('/:id', isEntityValid({ params }), asyncWrapper(deleteOffer))
