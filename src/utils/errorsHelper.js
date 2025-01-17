import { errors } from '#consts/errors.js'

const { UNAUTHORIZED, NOT_FOUND, FORBIDDEN, BAD_REQUEST } = errors

export const createError = (status, errorInfo) => {
  const err = new Error(errorInfo.message)
  err.status = status
  err.code = errorInfo.code

  return err
}

export const createUnauthorizedError = () => {
  return createError(401, UNAUTHORIZED)
}

export const createForbiddenError = () => {
  return createError(403, FORBIDDEN)
}

export const createNotFoundError = () => {
  return createError(404, NOT_FOUND)
}

export const createBadRequestError = () => {
  return createError(400, BAD_REQUEST)
}
