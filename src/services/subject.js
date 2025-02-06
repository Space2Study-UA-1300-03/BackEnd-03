import Subject from '#models/subject.js'

export const subjectsService = {
  getAllSubjects: async () => {
    const subjects = await Subject.find()

    return subjects
  }
}
