import { createError } from '#utils/errorsHelper.js'
import { errors } from '#consts/errors.js'
import Category from '#models/category.js'

const { CATEGORY_NOT_FOUND, CATEGORY_ALREADY_EXISTS } = errors

export const categoriesService = {
  getAllCategories: async () => {
    const categories = await Category.find()
    if (categories.length === 0) throw createError(404, CATEGORY_NOT_FOUND)

    return categories
  },

  getCategoryById: async (id) => {
    const category = await Category.findById(id)
    if (!category) throw createError(404, CATEGORY_NOT_FOUND)

    return category
  },

  getCategoryNames: async () => {
    const categories = await Category.find({}, 'categoryName')
    if (categories.length === 0) throw createError(404, CATEGORY_NOT_FOUND)

    return categories
  },

  createCategory: async (categoryData) => {
    const { categoryName, ...data } = categoryData

    const existingCategory = await Category.findOne({ categoryName })
    if (existingCategory) throw createError(409, CATEGORY_ALREADY_EXISTS)

    const newCategory = await Category.create({ categoryName, appearance: { ...data } })

    return newCategory
  }
}
