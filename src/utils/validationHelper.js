import { createError } from '#utils/errorsHelper.js'
import { errors } from '#consts/errors.js'

const {
  FIELD_IS_NOT_DEFINED,
  FIELD_IS_NOT_OF_PROPER_TYPE,
  FIELD_IS_NOT_OF_PROPER_LENGTH,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
  FIELD_IS_NOT_OF_PROPER_ENUM_VALUE
} = errors

export const validateRequired = (schemaFieldKey, required, field) => {
  if (required && !field) {
    throw createError(422, FIELD_IS_NOT_DEFINED(schemaFieldKey))
  }
}

export const validateType = (schemaFieldKey, type, field) => {
  if (type != typeof field) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_TYPE(schemaFieldKey, type))
  }
}

export const validateLength = (schemaFieldKey, length, field) => {
  if (field.length < length.min || field.length > length.max) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_LENGTH(schemaFieldKey, length))
  }
}

export const validateRegex = (schemaFieldKey, regex, field) => {
  if (!regex.test(field)) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_FORMAT(schemaFieldKey))
  }
}

export const validateEnum = (schemaFieldKey, enumSet, field) => {
  const isEnumValue = enumSet.some((value) => value === field)
  if (!isEnumValue) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_ENUM_VALUE(schemaFieldKey, enumSet))
  }
}

export const validateFunc = {
  required: validateRequired,
  type: validateType,
  length: validateLength,
  regex: validateRegex,
  enum: validateEnum
}
