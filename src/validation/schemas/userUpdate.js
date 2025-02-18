import { errorMassages } from '#consts/validationError.js'
import { lengths } from '#consts/validation.js'
import { z } from 'zod'

const { FIELD_IS_SHORTER_THAN_MIN, FIELD_IS_LONGER_THAN_MAX } = errorMassages
const { MIN_NAME_LENGTH, MAX_NAME_LENGTH, SUMMARY_LENGTH } = lengths

export const updateUserValidationSchema = z.object({
  firstName: z
    .string()
    .min(MIN_NAME_LENGTH, FIELD_IS_SHORTER_THAN_MIN(MIN_NAME_LENGTH))
    .max(MAX_NAME_LENGTH, FIELD_IS_LONGER_THAN_MAX(MAX_NAME_LENGTH))
    .toLowerCase()
    .trim(),

  lastName: z
    .string()
    .min(MIN_NAME_LENGTH, FIELD_IS_SHORTER_THAN_MIN(MIN_NAME_LENGTH))
    .max(MAX_NAME_LENGTH, FIELD_IS_LONGER_THAN_MAX(MAX_NAME_LENGTH))
    .toLowerCase()
    .trim(),

  country: z.string().toLowerCase().trim().optional(),

  city: z.string().toLowerCase().trim().optional(),

  professionalSummary: z
    .string()
    .max(SUMMARY_LENGTH, FIELD_IS_LONGER_THAN_MAX(SUMMARY_LENGTH))
    .toLowerCase()
    .trim()
    .optional(),

  languages: z.string().array().nonempty().optional(),

  interests: z.record(z.string(), z.array(z.string())).optional()
})
