import { subjectsService } from '#services/subject.js'

export const getAllSubjects = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5

  const subjects = await subjectsService.getAllSubjects(page, limit)

  res.status(200).json(subjects)
}
export const getAllSubjectsNames = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5

  const subjects = await subjectsService.getAllSubjectsNames(page, limit)

  res.status(200).json(subjects)
}

export const createSubjects = async (req, res) => {
  const newSubject = await subjectsService.createSubject(req.body)

  res.status(201).json(newSubject)
}

export const getSubjectById = async (req, res) => {
  const { id } = req.params
  const subject = await subjectsService.getSubjectById(id)

  res.status(200).json(subject)
}
