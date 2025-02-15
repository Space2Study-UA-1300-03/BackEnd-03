import { offerService } from '#services/offer.js'

export const createOffer = async (req, res) => {
  const newOffer = await offerService.createOffer(req.user, req.body)

  res.status(201).json(newOffer)
}

export const getOffers = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5

  const offers = await offerService.getOffers(page, limit)

  res.status(200).json(offers)
}

export const getOfferById = async (req, res) => {
  const { id } = req.params

  const offer = await offerService.getOfferById(id)

  res.status(200).json(offer)
}

export const updateOffer = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const { id: currentUserId } = req.user

  await offerService.updateOffer(id, currentUserId, updateData)

  res.status(204).end()
}

export const deleteOffer = async (req, res) => {
  const { id } = req.params

  await offerService.deleteOffer(id)

  res.status(204).end()
}
