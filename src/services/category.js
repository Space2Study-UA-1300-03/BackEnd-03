import Category from '#models/category.js'

export const categoriesService = {
  getCategories: async () => {
    return Category.find()
  }
}
