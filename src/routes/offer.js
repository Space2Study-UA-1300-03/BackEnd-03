import { getOffers, createOffer, updateOffer, deleteOffer, getOfferById } from '#controllers/offer.js'
import { createOfferValidationSchema } from '#validation/schemas/createOffer.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { authMiddleware } from '#middlewares/auth.js'
import express from 'express'

export const router = express.Router({ mergeParams: true })

router.use(asyncWrapper(authMiddleware))
router.post('/', dataValidation(createOfferValidationSchema), asyncWrapper(createOffer))
router.get('/', asyncWrapper(getOffers))

router.param('id', idValidation)
router.get('/:id', asyncWrapper(getOfferById))
router.patch('/:id', asyncWrapper(updateOffer))
router.delete('/:id', asyncWrapper(deleteOffer))
