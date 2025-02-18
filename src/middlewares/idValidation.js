import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import mongoose from 'mongoose'

const { INVALID_ID } = error

export const idValidation = (req, _res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, INVALID_ID))

  next()
}
