import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import Category from '#models/category.js'
import Subject from '#models/subject.js'

const { CATEGORY_NOT_FOUND, CATEGORY_ALREADY_EXISTS } = error

export const categoriesService = {
  /**
   * Retrieves all categories with pagination.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} An object containing pagination info and the list of categories.
   * @throws {Error} If no categories are found.
   */
  getAllCategories: async (page, limit) => {
    const totalCategories = await Category.countDocuments()

    const totalPages = Math.ceil(totalCategories / limit)
    const skip = (page - 1) * limit

    const categories = await Category.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
    if (categories.length === 0) throw createError(404, CATEGORY_NOT_FOUND)

    return {
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCategories,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      data: categories
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
    const totalCategories = await Category.countDocuments()

    const totalPages = Math.ceil(totalCategories / limit)
    const skip = (page - 1) * limit

    const categories = await Category.find({}, 'categoryName').sort({ createdAt: -1 }).skip(skip).limit(limit)
    if (categories.length === 0) throw createError(404, CATEGORY_NOT_FOUND)

    return {
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCategories,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      data: categories
    }
  },

  getCategoryById: async (id) => {
    const category = await Category.findById(id)
    if (!category) throw createError(404, CATEGORY_NOT_FOUND)

    return category
  },

  createCategory: async (categoryData) => {
    const { categoryName, ...data } = categoryData

    const existingCategory = await Category.findOne({ categoryName })
    if (existingCategory) throw createError(409, CATEGORY_ALREADY_EXISTS)

    const newCategory = await Category.create({ categoryName, appearance: { ...data } })

    return newCategory
  },

  getSubjectNamesByCategoryId: async (id) => {
    const allSubjectNames = await Subject.find({ categoryId: id })

    return allSubjectNames
  }
}
