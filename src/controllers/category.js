import { categoriesService } from '#services/category.js'

export const getCategories = async (_req, res) => {
  const categories = await categoriesService.getCategories()

  res.status(200).json(categories)
}
