import { createError } from '#utils/errorsHelper.js'
import { enums } from '#consts/validation.js'
import { errors } from '#consts/errors.js'

export const langMiddleware = (req, _res, next) => {
  const INVALID_LANGUAGE = errors.INVALID_LANGUAGE
  const APP_LANG_ENUM = enums.APP_LANG_ENUM

  let lang = req.acceptsLanguages(...APP_LANG_ENUM)

  if (!lang) {
    throw createError(400, INVALID_LANGUAGE)
  }

  req.lang = lang
  next()
}
