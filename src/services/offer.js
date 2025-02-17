import { createError, createForbiddenError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import Offer from '#models/offer.js'

const { OFFER_NOT_FOUND } = error

export const offerService = {
  createOffer: async (user, data) => {
    const updatedOffer = {
      title: data.title,
      description: data.description,
      price: data.price,
      aboutAuthor: {
        author: user._id,
        authorRole: user.role[0]
      },
      aboutInterests: {
        categoryInfo: data.categoryId,
        subjectInfo: data.subjectId
      },
      proficiencyLevel: data.proficiencyLevel,
      languages: data.languages,
      FAQ: data.faq
    }

    const newOffer = await Offer.create(updatedOffer)

    return newOffer
  },

  getOffers: async (page, limit) => {
    const normalizedLimit = Math.max(1, Math.min(10, limit))

    const totalCategories = await Offer.countDocuments()
    if (totalCategories === 0) throw createError(404, OFFER_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalCategories / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const categories = await Offer.find().sort({ createdAt: -1 }).skip(skip).limit(normalizedLimit)

    return {
      pagination: {
        currentPage: normalizedPage,
        totalPages,
        totalItems: totalCategories,
        itemsPerPage: normalizedLimit,
        hasNextPage: normalizedPage < totalPages,
        hasPrevPage: normalizedPage > 1
      },
      data: categories
    }
  },

  getOfferById: async (id) => {
    const offer = await Offer.findById(id)
    if (!offer) throw createError(404, OFFER_NOT_FOUND)

    return offer
  },

  deleteOffer: async (id, user) => {
    const offer = await Offer.findById(id)
    if (!offer) throw createError(404, OFFER_NOT_FOUND)

    if (user._id !== offer.aboutAuthor.author) throw createForbiddenError()

    await Offer.findByIdAndRemove(id).exec()
  },

  updateOffer: async (id, user, data) => {
    const offerExists = await Offer.findById(id)
    if (!offerExists) throw createError(404, OFFER_NOT_FOUND)

    if (user._id !== offerExists.aboutAuthor.author) throw createForbiddenError()

    const updatedOffer = {
      title: data.title,
      description: data.description,
      price: data.price,
      aboutAuthor: {
        author: user._id,
        authorRole: user.role[0]
      },
      aboutInterests: {
        categoryInfo: data.categoryId,
        subjectInfo: data.subjectId
      },
      proficiencyLevel: data.proficiencyLevel,
      languages: data.languages,
      FAQ: data.faq
    }

    const offer = await Offer.findByIdAndUpdate(id, updatedOffer, { new: true })

    return offer
  }
}
