import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import mongoose from 'mongoose'

const { INVALID_ID } = error

export const idValidation = (_req, _res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw createError(400, INVALID_ID)

  next()
}
