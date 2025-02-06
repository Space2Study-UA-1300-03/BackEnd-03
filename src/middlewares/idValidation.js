import { createError } from '#utils/errorsHelper.js'
import { errors } from '#consts/errors.js'
import mongoose from 'mongoose'

const { INVALID_ID } = errors

export const idValidation = (_req, _res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw createError(400, INVALID_ID)

  next()
}
