import { categoriesService } from '#services/category.js'
import { subjectsService } from '#services/subject.js'

export const getAllCategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5

  const categories = await categoriesService.getAllCategories(page, limit)

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

export const getSubjectNamesByCategoryId = async (req, res) => {
  const { id } = req.params

  const subjectsNames =
    id !== ':id' ? await categoriesService.getSubjectNamesByCategoryId(id) : await subjectsService.getAllSubjects()

  res.status(200).json(subjectsNames)
}
