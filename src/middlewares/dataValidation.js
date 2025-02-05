import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import { fromError } from 'zod-validation-error'
import { logger } from '#logger/logger.js'

const { FIELD_IS_NOT_OF_PROPER, BODY_IS_NOT_DEFINED } = error

export const dataValidation = (schema) => {
  return (req, _res, next) => {
    if (!req.body) throw createError(422, BODY_IS_NOT_DEFINED)

    const { data, error } = schema.safeParse(req.body)

    if (error) {
      const errorPrettify = fromError(error).toString()
      logger.error(errorPrettify)
      throw createError(422, FIELD_IS_NOT_OF_PROPER(errorPrettify))
    }

    req.body = data
    next()
  }
}
