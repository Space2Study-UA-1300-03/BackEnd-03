import { createForbiddenError } from '#utils/errorsHelper.js'
import { tokenValidation } from '#utils/tokenValidation.js'

export const authMiddleware = async (req, _res, next) => {
  const accessToken = req.cookies.accessToken || req.headers.cookie

  const userData = await tokenValidation(accessToken)

  req.user = userData

  next()
}

export const restrictTo = (...allowedRoles) => {
  return (req, _res, next) => {
    const hasAllowedRole = req.user.role.some((userRole) => allowedRoles.includes(userRole))
    if (!hasAllowedRole) return next(createForbiddenError())

    next()
  }
}
