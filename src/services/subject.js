import { categoriesService } from '#services/category.js'
import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import Subject from '#models/subject.js'
import mongoose from 'mongoose'

const { CATEGORY_NOT_FOUND, SUBJECT_NOT_FOUND, INVALID_ID } = error

export const subjectsService = {
  getAllSubjects: async () => {
    const subjects = await Subject.find()
    if (!subjects.length === 0) throw createError(404, SUBJECT_NOT_FOUND)

    return subjects
  },

  createSubject: async (subjectData) => {
    const { categoryId, subjectName } = subjectData

    const validId = mongoose.Types.ObjectId.isValid(categoryId)
    if (!validId) throw createError(400, INVALID_ID)

    const existingCategory = await categoriesService.getCategoryById(categoryId)
    if (!existingCategory) throw createError(404, CATEGORY_NOT_FOUND)

    const newSubject = await Subject.create({ categoryId, subjectName })

    return newSubject
  }
}
