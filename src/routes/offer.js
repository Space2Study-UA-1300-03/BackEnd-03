import { getOffers, getPopularOffers, createOffer, updateOffer, deleteOffer, getOfferById } from '#controllers/offer.js'
import { createOfferValidationSchema } from '#validation/schemas/createOffer.js'
import { dataValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import { authMiddleware } from '#middlewares/auth.js'
import express from 'express'
import { offerQuery } from '#middlewares/queryValidation.js'

export const router = express.Router({ mergeParams: true })

router.use(asyncWrapper(authMiddleware))
router.post('/', dataValidation(createOfferValidationSchema), asyncWrapper(createOffer))
router.get('/', asyncWrapper(offerQuery), asyncWrapper(getOffers))
router.get('/popular', asyncWrapper(getPopularOffers))

router.param('id', idValidation)
router.get('/:id', asyncWrapper(getOfferById))
router.delete('/:id', asyncWrapper(deleteOffer))
router.patch('/:id', dataValidation(createOfferValidationSchema), asyncWrapper(updateOffer))
