import { SeedSuperAdmin } from './seedSuperAdmin.js'
import { logger } from '#logger/logger.js'
import { roles } from '#consts/auth.js'
import User from '#models/user.js'

const SUPERADMIN = roles.SUPERADMIN

export const checkUserExistence = async () => {
  try {
    const isUserExist = await User.exists({ role: SUPERADMIN })

    if (!isUserExist) {
      return await SeedSuperAdmin.createSuperAdmin()
    }
  } catch (err) {
    logger.error(err)
  }
}
