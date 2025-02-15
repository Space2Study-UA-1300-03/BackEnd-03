import { allowedOfferFieldsForUpdate } from '#validation/services/offer.js'
import { filterAllowedFields } from '#utils/filterAllowedFields.js'
import Offer from '#models/offer.js'

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

  getOffers: async (pipeline) => {
    const [response] = await Offer.aggregate(pipeline).exec()
    return response
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
