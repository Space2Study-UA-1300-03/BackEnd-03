import Category from '#models/category.js'

export const categoriesService = {
  getAllCategories: async () => {
    return Category.find()
  }
}
