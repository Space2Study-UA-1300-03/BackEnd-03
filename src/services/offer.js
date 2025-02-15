import { allowedOfferFieldsForUpdate } from '#validation/services/offer.js'
import { filterAllowedFields } from '#utils/filterAllowedFields.js'
import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import Offer from '#models/offer.js'

const { CATEGORY_NOT_FOUND } = error

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
    if (totalCategories === 0) throw createError(404, CATEGORY_NOT_FOUND)

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
      .populate([
        {
          path: 'author',
          select: ['firstName', 'lastName', 'totalReviews', 'averageRating', 'photo', 'professionalSummary', 'FAQ']
        },
        { path: 'subject', select: 'name' },
        { path: 'category', select: 'appearance' }
      ])
      .lean()
      .exec()

    if (offer.author.FAQ && offer.authorRole in offer.author.FAQ) {
      offer.author.FAQ = offer.author.FAQ[offer.authorRole]
    } else {
      delete offer.author.FAQ
    }

    return offer
  },

  updateOffer: async (id, currentUserId, updateData) => {
    const filteredUpdateData = filterAllowedFields(updateData, allowedOfferFieldsForUpdate)

    const offer = await Offer.findById(id)

    for (let field in filteredUpdateData) {
      offer[field] = filteredUpdateData[field]
    }

    await offer.validate()
    await offer.save()
  },

  deleteOffer: async (id) => {
    await Offer.findByIdAndRemove(id).exec()
  }
}
