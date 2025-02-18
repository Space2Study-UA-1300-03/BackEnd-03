import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import { query } from '#consts/validation.js'
import Category from '#models/category.js'
import Subject from '#models/subject.js'

const { CATEGORY_NOT_FOUND, CATEGORY_ALREADY_EXISTS } = error
const { MAX_LIMIT } = query

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
  getAllCategories: async (page, limit, name) => {
    const searchQuery = {}
    if (name) searchQuery.categoryName = { $regex: name, $options: 'i' }

    const normalizedLimit = Math.max(1, Math.min(MAX_LIMIT, limit))

    const totalCategories = await Category.countDocuments(searchQuery)
    if (totalCategories === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalCategories / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const categories = await Category.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(normalizedLimit)

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

  /**
   * Retrieves category names with pagination.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} An object containing pagination info and the list of category names.
   * @throws {Error} If no categories are found.
   */
  getCategoryNames: async (page, limit, name) => {
    const searchQuery = {}
    if (name) searchQuery.categoryName = { $regex: name, $options: 'i' }

    const normalizedLimit = Math.max(1, Math.min(MAX_LIMIT, limit))

    const totalCategories = await Category.countDocuments(searchQuery)
    if (totalCategories === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalCategories / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const categories = await Category.find(searchQuery, 'categoryName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(normalizedLimit)

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
  getSubjectByCategoryId: async (categoryId, page, limit, name) => {
    const searchQuery = { categoryId }
    if (name) searchQuery.subjectName = { $regex: name, $options: 'i' }

    const normalizedLimit = Math.max(1, Math.min(MAX_LIMIT, limit))

    const totalSubjects = await Subject.countDocuments(searchQuery)
    console.log(totalSubjects)

    if (totalSubjects === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalSubjects / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const allSubjectNames = await Subject.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(normalizedLimit)

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
  getSubjectNamesByCategoryId: async (categoryId, page, limit, name) => {
    const searchQuery = { categoryId }
    if (name) searchQuery.subjectName = { $regex: name, $options: 'i' }

    const normalizedLimit = Math.max(1, Math.min(MAX_LIMIT, limit))

    const totalSubjects = await Subject.countDocuments(searchQuery)
    if (totalSubjects === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalSubjects / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const allSubjectNames = await Subject.find(searchQuery, 'subjectName categoryId')
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

  createCategory: async (categoryData) => {
    const { categoryName, ...data } = categoryData

    const existingCategory = await Category.findOne({ categoryName })
    if (existingCategory) throw createError(409, CATEGORY_ALREADY_EXISTS)

    const newCategory = await Category.create({ categoryName, appearance: { ...data } })

    return newCategory
  }
}
