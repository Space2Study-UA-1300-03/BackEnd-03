import { createUnauthorizedError } from '#utils/errorsHelper.js'
import { tokenService } from '#services/token.js'

export const tokenValidation = (accessToken) => {
  if (!accessToken) {
    throw createUnauthorizedError()
  }

  const userData = tokenService.validateAccessToken(accessToken)
  if (!userData) {
    throw createUnauthorizedError()
  }

  return userData
}
