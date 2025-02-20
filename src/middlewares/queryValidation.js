import { sortByRole, sortByType } from '#src/utils/sort.js'
import { query, enums } from '#consts/validation.js'
import mongoose from 'mongoose'

const { SPOKEN_LANG_ENUM, SORT } = enums
const { PER_PAGE, START_PAGE } = query

export const offerQuery = (req, _res, next) => {
  const prettyQuery = {}

  const categoryId = req.query.categoryId
  if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) prettyQuery.categoryId = categoryId

  const subjectId = req.query.subjectId
  if (subjectId && mongoose.Types.ObjectId.isValid(subjectId)) prettyQuery.subjectId = subjectId

  const role = sortByRole(req.query.role)
  if (role) prettyQuery.role = role

  const search = req.query.search?.trim()
  if (search) prettyQuery.search = search

  const language = req.query.language
  if (language && SPOKEN_LANG_ENUM.includes(language)) prettyQuery.language = language

  const sort = req.query.sort
  if (sort && SORT.includes(sort)) prettyQuery.sort = sortByType(sort)

  const page = parseInt(req.query.page) || START_PAGE
  const limit = parseInt(req.query.limit) || PER_PAGE

  prettyQuery.page = page
  prettyQuery.limit = limit

  req.query = prettyQuery
  next()
}
