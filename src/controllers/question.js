import { getCategoriesOptions } from '#utils/getCategoriesOption.js'
import { getMatchOptions } from '#utils/getMatchOptions.js'
import { getSortOptions } from '#utils/getSortOptions.js'
import { questionService } from '#services/question.js'

export const getQuestions = async (req, res) => {
  const { id: author } = req.user
  const { title, sort, skip, limit, categories } = req.query
  const categoriesOptions = getCategoriesOptions(categories)

  const match = getMatchOptions({
    author,
    title,
    category: categoriesOptions
  })
  const sortOptions = getSortOptions(sort)

  const questions = await questionService.getQuestions(match, sortOptions, parseInt(skip), parseInt(limit))

  res.status(200).json(questions)
}

export const getQuestionById = async (req, res) => {
  const { id } = req.params

  const question = await questionService.getQuestionById(id)

  res.status(200).json(question)
}

export const createQuestion = async (req, res) => {
  const { id: author } = req.user
  const data = req.body

  const newQuestion = await questionService.createQuestion(author, data)

  res.status(201).json(newQuestion)
}

export const deleteQuestion = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  await questionService.deleteQuestion(id, userId)

  res.status(204).end()
}

export const updateQuestion = async (req, res) => {
  const { id } = req.params
  const { id: currentUserId } = req.user
  const data = req.body

  const updatedQuestion = await questionService.updateQuestion(id, currentUserId, data)

  res.status(200).json(updatedQuestion)
}
