import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import Category from '#models/category.js'
import Subject from '#models/subject.js'
import Offer from '#models/offer.js'

const { CATEGORY_NOT_FOUND, CATEGORY_ALREADY_EXISTS } = error

/**
 * Service for managing categories and related subjects.
 */
export const categoriesService = {
  /**
   * Retrieves all categories with pagination.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} An object containing pagination info and the list of categories.
   * @throws {Error} If no categories are found.
   */
  getAllCategories: async (page, limit) => {
    // 1. Нормалізація параметрів пагінації
    const normalizedLimit = Math.max(1, Math.min(10, limit))
    const totalCategories = await Category.countDocuments()
    if (totalCategories === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalCategories / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))
    const skip = (normalizedPage - 1) * normalizedLimit

    // 2. Отримання категорій
    const categories = await Category.find().sort({ createdAt: -1 }).skip(skip).limit(normalizedLimit)

    // 3. Отримання ID всіх категорій
    const categoryIds = categories.map((cat) => cat._id)

    // 4. Пошук всіх пропозицій для цих категорій
    const relatedOffers = await Offer.find({
      'aboutInterests.categoryInfo': { $in: categoryIds }
    })
      .select('_id aboutInterests.categoryInfo')
      .lean()

    // 5-6. Групування пропозицій за категоріями та створення фінального масиву
    const categoriesWithOffers = categories.map((category) => {
      const categoryObj = category.toObject()
      const offers = relatedOffers.reduce((acc, offer) => {
        if (offer.aboutInterests.categoryInfo.toString() === category._id.toString()) {
          acc.push({ offerId: offer._id })
        }
        return acc
      }, [])

      return { ...categoryObj, offerInfo: offers }
    })

    // 7. Повернення результату
    return {
      pagination: {
        currentPage: normalizedPage,
        totalPages,
        totalItems: totalCategories,
        itemsPerPage: normalizedLimit,
        hasNextPage: normalizedPage < totalPages,
        hasPrevPage: normalizedPage > 1
      },
      data: categoriesWithOffers
    }
  },

  /**
   * Retrieves category names with pagination.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} An object containing pagination info and the list of category names.
   * @throws {Error} If no categories are found.
   */
  getCategoryNames: async (page, limit) => {
    const normalizedLimit = Math.max(1, Math.min(10, limit))

    const totalCategories = await Category.countDocuments()
    if (totalCategories === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalCategories / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const categories = await Category.find({}, 'categoryName').sort({ createdAt: -1 }).skip(skip).limit(normalizedLimit)

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

  getCategoryById: async (id) => {
    const category = await Category.findById(id)
    if (!category) throw createError(404, CATEGORY_NOT_FOUND)

    return category
  },

  /**
   * Retrieves subjects by category ID with pagination.
   * @param {string} id - The ID of the category.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} An object containing pagination info and the list of subjects.
   */
  getSubjectByCategoryId: async (id, page, limit) => {
    const normalizedLimit = Math.max(1, Math.min(10, limit))

    const totalSubjects = await Subject.countDocuments({ categoryId: id })
    if (totalSubjects === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalSubjects / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const allSubjectNames = await Subject.find({ categoryId: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(normalizedLimit)

    return {
      pagination: {
        currentPage: normalizedPage,
        totalPages,
        totalItems: totalSubjects,
        itemsPerPage: normalizedLimit,
        hasNextPage: normalizedPage < totalPages,
        hasPrevPage: normalizedPage > 1
      },
      data: allSubjectNames
    }
  },

  /**
   * Retrieves subject names by category ID with pagination.
   * @param {string} id - The ID of the category.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} An object containing pagination info and the list of subject names.
   */
  getSubjectNamesByCategoryId: async (id, page, limit) => {
    const normalizedLimit = Math.max(1, Math.min(10, limit))

    const totalSubjects = await Subject.countDocuments({ categoryId: id })
    if (totalSubjects === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalSubjects / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const allSubjectNames = await Subject.find({ categoryId: id }, 'subjectName categoryId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return {
      pagination: {
        currentPage: normalizedPage,
        totalPages,
        totalItems: totalSubjects,
        itemsPerPage: normalizedLimit,
        hasNextPage: normalizedPage < totalPages,
        hasPrevPage: normalizedPage > 1
      },
      data: allSubjectNames
    }
  },

  createCategory: async (categoryData) => {
    const { categoryName, ...data } = categoryData

    const existingCategory = await Category.findOne({ categoryName })
    if (existingCategory) throw createError(409, CATEGORY_ALREADY_EXISTS)

    const newCategory = await Category.create({ categoryName, appearance: { ...data } })

    return newCategory
  }
}
