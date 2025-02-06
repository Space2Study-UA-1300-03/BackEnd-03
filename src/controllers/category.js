import { categoriesService } from '#services/category.js'

export const getAllCategories = async (_req, res) => {
  const categories = await categoriesService.getAllCategories()

  res.status(200).json(categories)
}

export const getCategoryById = async (req, res) => {
  const { id } = req.params
  const category = await categoriesService.getCategoryById(id)

  res.status(200).json(category)
}
export const getCategoryNames = async (_req, res) => {
  const categories = await categoriesService.getCategoryNames()

  res.status(200).json(categories)
}

export const createCategory = async (req, res) => {
  const newCategory = await categoriesService.createCategory(req.body)

  res.status(201).json(newCategory)
}
