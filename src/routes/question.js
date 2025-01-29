import { getQuestions, getQuestionById, createQuestion, deleteQuestion, updateQuestion } from '#controllers/question.js'
import { authMiddleware, restrictTo } from '#middlewares/auth.js'
import { isEntityValid } from '#middlewares/entityValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { idValidation } from '#middlewares/idValidation.js'
import Question from '#models/question.js'
import { roles } from '#consts/auth.js'
import express from 'express'

const { TUTOR } = roles

export const router = express.Router()

router.use(authMiddleware)
router.param('id', idValidation)
const params = [{ model: Question, idName: 'id' }]

router.get('/', asyncWrapper(getQuestions))
router.get('/:questionId', isEntityValid({ params }), asyncWrapper(getQuestionById))
router.use(restrictTo(TUTOR))
router.post('/', asyncWrapper(createQuestion))
router.delete('/:questionId', isEntityValid({ params }), asyncWrapper(deleteQuestion))
router.patch('/:questionId', isEntityValid({ params }), asyncWrapper(updateQuestion))
