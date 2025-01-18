import { superAdmin } from '#configs/config.js'
import { logger } from '#logger/logger.js'
import { roles } from '#consts/auth.js'
import User from '#models/user.js'

const { firstName, lastName, email, password } = superAdmin.all
const { SUPERADMIN } = roles

export const SeedSuperAdmin = {
  createSuperAdmin: async () => {
    try {
      const superAdmin = {
        role: SUPERADMIN,
        firstName,
        lastName,
        email,
        password,
        active: true,
        isEmailConfirmed: true
      }

      return await User.create(superAdmin)
    } catch (err) {
      logger.error(err)
    }
  }
}
