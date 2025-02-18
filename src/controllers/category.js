import { categoriesService } from '#services/category.js'
import { subjectsService } from '#services/subject.js'
import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import { query } from '#consts/validation.js'
import mongoose from 'mongoose'

const { PER_PAGE, START_PAGE } = query
const { INVALID_ID } = error

export const getAllCategories = async (req, res) => {
  const page = parseInt(req.query.page) || PER_PAGE
  const limit = parseInt(req.query.limit) || START_PAGE
  const { name } = req.query

  const categories = await categoriesService.getAllCategories(page, limit, name)

  res.status(200).json(categories)
}

export const getCategoryNames = async (req, res) => {
  const page = parseInt(req.query.page) || PER_PAGE
  const limit = parseInt(req.query.limit) || START_PAGE
  const { name } = req.query

  const categories = await categoriesService.getCategoryNames(page, limit, name)

  res.status(200).json(categories)
}

export const getCategoryById = async (req, res) => {
  const { id } = req.params
  const category = await categoriesService.getCategoryById(id)

  res.status(200).json(category)
}

export const createCategory = async (req, res) => {
  const newCategory = await categoriesService.createCategory(req.body)

  res.status(201).json(newCategory)
}

export const getSubjectByCategoryId = async (req, res) => {
  const page = parseInt(req.query.page) || PER_PAGE
  const limit = parseInt(req.query.limit) || START_PAGE
  const { name } = req.query
  const { id } = req.params

  if (id && !mongoose.Types.ObjectId.isValid(id)) throw createError(400, INVALID_ID)

  const subjectsNames = id
    ? await categoriesService.getSubjectByCategoryId(id, page, limit, name)
    : await subjectsService.getAllSubjects(page, limit, name)

  res.status(200).json(subjectsNames)
}
export const getSubjectNamesByCategoryId = async (req, res) => {
  const page = parseInt(req.query.page) || PER_PAGE
  const limit = parseInt(req.query.limit) || START_PAGE
  const { name } = req.query
  const { id } = req.params

  if (id && !mongoose.Types.ObjectId.isValid(id)) throw createError(400, INVALID_ID)

  const subjectsNames = id
    ? await categoriesService.getSubjectNamesByCategoryId(id, page, limit, name)
    : await subjectsService.getAllSubjects(page, limit, name)

  res.status(200).json(subjectsNames)
}
