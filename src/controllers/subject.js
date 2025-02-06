import { subjectsService } from '#services/subject.js'

export const getAllSubjects = async (_req, res) => {
  const subjects = await subjectsService.getAllSubjects()

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
