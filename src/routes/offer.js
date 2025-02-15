import { getOffers, createOffer, updateOffer, deleteOffer, getOfferById } from '#controllers/offer.js'
import { createOfferValidationSchema } from '#validation/schemas/createOffer.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { isEntityValid } from '#middlewares/entityValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { authMiddleware } from '#middlewares/auth.js'
import Offer from '#models/offer.js'
import express from 'express'

export const router = express.Router({ mergeParams: true })

router.use(asyncWrapper(authMiddleware))
router.post('/', dataValidation(createOfferValidationSchema), asyncWrapper(createOffer))
router.get('/', asyncWrapper(getOffers))

const params = [{ model: Offer, idName: 'id' }]
router.param('id', idValidation)
router.get('/:id', isEntityValid({ params }), asyncWrapper(getOfferById))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(updateOffer))
router.delete('/:id', isEntityValid({ params }), asyncWrapper(deleteOffer))
