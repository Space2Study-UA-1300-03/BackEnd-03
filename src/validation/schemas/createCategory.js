import { errorMassages } from '#consts/validationError.js'
import { lengths } from '#consts/validation.js'
import { z } from 'zod'

const { FIELD_IS_SHORTER_THAN_MIN, FIELD_IS_LONGER_THAN_MAX } = errorMassages
const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = lengths

export const createCategoryValidationSchema = z.object({
  categoryName: z
    .string()
    .min(MIN_NAME_LENGTH, FIELD_IS_SHORTER_THAN_MIN(MIN_NAME_LENGTH))
    .max(MAX_NAME_LENGTH, FIELD_IS_LONGER_THAN_MAX(MAX_NAME_LENGTH))
    .toLowerCase()
    .trim(),
  icon: z.string().optional(),
  color: z.string().optional()
})
