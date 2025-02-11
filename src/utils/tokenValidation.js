import { createUnauthorizedError } from '#utils/errorsHelper.js'
import { tokenService } from '#services/token.js'
import { userService } from '#services/user.js'

export const tokenValidation = async (accessToken) => {
  if (!accessToken) {
    throw createUnauthorizedError()
  }

  const userData = tokenService.validateAccessToken(accessToken)
  if (!userData) {
    throw createUnauthorizedError()
  }

  const user = await userService.getUserById(userData.id)

  if (!user) {
    throw createUnauthorizedError()
  }

  return user
}
