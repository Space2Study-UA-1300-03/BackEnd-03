import { categoriesService } from '#services/category.js'
import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import Subject from '#models/subject.js'
import mongoose from 'mongoose'

const { CATEGORY_NOT_FOUND, SUBJECT_NOT_FOUND, INVALID_ID } = error

export const subjectsService = {
  getAllSubjects: async (page, limit) => {
    const totalCategories = await Subject.countDocuments()

    const totalPages = Math.ceil(totalCategories / limit)
    const skip = (page - 1) * limit

    const subjects = await Subject.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
    if (!subjects.length === 0) throw createError(404, SUBJECT_NOT_FOUND)

    return {
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCategories,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
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
