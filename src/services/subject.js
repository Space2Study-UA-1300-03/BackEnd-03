import { categoriesService } from '#services/category.js'
import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import { query } from '#consts/validation.js'
import Subject from '#models/subject.js'
import mongoose from 'mongoose'

const { CATEGORY_NOT_FOUND, SUBJECT_NOT_FOUND, INVALID_ID } = error
const { MAX_LIMIT } = query

/**
 * Service for managing subjects.
 */
export const subjectsService = {
  /**
   * Retrieves all subjects with pagination.
   *
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} An object containing pagination info and the list of subjects.
   * @throws {Error} If no subjects are found.
   */
  getAllSubjects: async (page, limit, name) => {
    console.log('getAllSubjects')
    const searchQuery = {}
    if (name) searchQuery.subjectName = { $regex: name, $options: 'i' }

    const normalizedLimit = Math.max(1, Math.min(MAX_LIMIT, limit))

    const totalSubjects = await Subject.countDocuments(searchQuery)
    if (totalSubjects === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalSubjects / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const subjects = await Subject.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(normalizedLimit)

    return {
      pagination: {
        currentPage: normalizedPage,
        totalPages,
        totalItems: totalSubjects,
        itemsPerPage: normalizedLimit,
        hasNextPage: normalizedPage < totalPages,
        hasPrevPage: normalizedPage > 1
      },
      data: subjects
    }
  },

  /**
   * Retrieves all subject names with pagination.
   *
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} An object containing pagination info and the list of subject names.
   * @throws {Error} If no subjects are found.
   */
  getAllSubjectsNames: async (page, limit, name) => {
    const searchQuery = {}
    if (name) searchQuery.subjectName = { $regex: name, $options: 'i' }

    const normalizedLimit = Math.max(1, Math.min(MAX_LIMIT, limit))

    const totalSubjects = await Subject.countDocuments(searchQuery)
    if (totalSubjects === 0) throw createError(404, CATEGORY_NOT_FOUND)

    const totalPages = Math.max(1, Math.ceil(totalSubjects / normalizedLimit))
    const normalizedPage = Math.max(1, Math.min(page, totalPages))

    const skip = (normalizedPage - 1) * normalizedLimit

    const subjects = await Subject.find(searchQuery, 'subjectName categoryId')
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
      data: subjects
    }
  },

  createSubject: async (subjectData) => {
    const { categoryId, subjectName } = subjectData

    const validId = mongoose.Types.ObjectId.isValid(categoryId)
    if (!validId) throw createError(400, INVALID_ID)

    const existingCategory = await categoriesService.getCategoryById(categoryId)
    if (!existingCategory) throw createError(404, CATEGORY_NOT_FOUND)

    const newSubject = await Subject.create({ categoryId, subjectName })

    return newSubject
  },

  getSubjectById: async (id) => {
    const subject = await Subject.findById(id)
    if (!subject) throw createError(404, SUBJECT_NOT_FOUND)

    return subject
  }
}
