import { createError, createForbiddenError } from '#utils/errorsHelper.js'
import { SALT_ROUNDS } from '#consts/auth.js'
import { errors } from '#consts/errors.js'
import User from '#models/user.js'
import bcrypt from 'bcrypt'

const { DOCUMENT_NOT_FOUND, ALREADY_REGISTERED } = errors

export const userService = {
  getUserById: async (id, role) => {
    return await User.findOne({ _id: id, ...(role && { role }) })
      .select('+lastLoginAs +isEmailConfirmed +isFirstLogin')
      .lean()
      .exec()
  },

  getUserByEmail: async (email) => {
    const user = await User.findOne({ email })
      .select('+password +lastLoginAs +isEmailConfirmed +isFirstLogin +appLanguage')
      .lean()
      .exec()

    if (!user) {
      return null
    }

    return user
  },

  createUser: async (role, firstName, lastName, email, password, appLanguage, isEmailConfirmed = false) => {
    const duplicateUser = await userService.getUserByEmail(email)

    if (duplicateUser) {
      throw createError(409, ALREADY_REGISTERED)
    }

    return await User.create({
      role,
      firstName,
      lastName,
      email,
      lastLoginAs: role,
      password,
      appLanguage,
      isEmailConfirmed
    })
  },

  privateUpdateUser: async (id, param) => {
    const user = await User.findByIdAndUpdate(id, param, { new: true }).exec()

    if (!user) {
      throw createError(404, DOCUMENT_NOT_FOUND([User.modelName]))
    }
  },

  emailVerification: async (id) => {
    await User.findByIdAndUpdate(id, { isEmailConfirmed: true }, { new: true }).exec()
  },

  updateUser: async (user, data) => {
    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: {
        country: data.country,
        city: data.city
      },
      professionalSummary: data.professionalSummary,
      mainInterests: data.interests,
      nativeLanguage: data.languages
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, { new: true, runValidators: true })
    if (!updatedUser) throw createForbiddenError()

    return updatedUser
  },

  updateStatus: async (id, updateStatus) => {
    const statusesForChange = {}

    for (const role in updateStatus) {
      statusesForChange['status.' + role] = updateStatus[role]
    }

    const user = await User.findByIdAndUpdate(id, { $set: statusesForChange }, { new: true }).lean().exec()

    if (!user) {
      throw createError(404, DOCUMENT_NOT_FOUND([User.modelName]))
    }
  },

  deleteUser: async (id) => {
    await User.findByIdAndRemove(id).exec()
  },

  hashPassword: async (pass) => {
    return await bcrypt.hash(pass, SALT_ROUNDS)
  },

  verifyPassword: async (pass, hashedPassword) => {
    return await bcrypt.compare(pass, hashedPassword)
  }
}
