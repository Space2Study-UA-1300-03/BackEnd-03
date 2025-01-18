import { validateRequired, validateFunc } from '#utils/validationHelper.js'
import { createError } from '#utils/errorsHelper.js'
import { errors } from '#consts/errors.js'

export const validationMiddleware = (schema) => {
  const BODY_IS_NOT_DEFINED = errors.BODY_IS_NOT_DEFINED

  return (req, _res, next) => {
    const { body } = req
    if (!body) {
      throw createError(422, BODY_IS_NOT_DEFINED)
    }

    Object.entries(schema).forEach(([schemaFieldKey, schemaFieldValue]) => {
      const reqBodyField = body[schemaFieldKey]
      validateRequired(schemaFieldKey, schemaFieldValue?.required, reqBodyField)
      if (reqBodyField) {
        Object.entries(schemaFieldValue).forEach(([validationType, validationValue]) => {
          validateFunc[validationType](schemaFieldKey, validationValue, reqBodyField)
        })
      }
    })

    next()
  }
}
