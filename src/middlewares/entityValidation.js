import { createError } from '#utils/errorsHelper.js'
import { errors } from '#consts/errors.js'

const { DOCUMENT_NOT_FOUND } = errors

export const isEntityValid = (entities) => {
  return async (req, _res, next) => {
    const models = []

    let id = null

    if (entities.params?.length) {
      for (const { model, idName } of entities.params) {
        id = req.params[idName]

        if (!id) continue

        const document = await model.findById(id)

        if (!document && !models.includes(model.modelName)) models.push(model.modelName)
      }
    }

    if (entities.body?.length) {
      for (const { model, idName } of entities.body) {
        if (Array.isArray(req.body[idName])) {
          await Promise.all(
            req.body[idName].map(async (id) => {
              const document = await model.findById(id)

              if (!document && !models.includes(model.modelName)) {
                models.push(model.modelName)
              }
            })
          )
        } else {
          id = req.body[idName]

          if (!id) continue

          const document = await model.findById(id)

          if (!document && !models.includes(model.modelName)) models.push(model.modelName)
        }
      }
    }

    if (models.length) {
      next(createError(404, DOCUMENT_NOT_FOUND(models)))
    }

    next()
  }
}
