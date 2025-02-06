import { errorMassages } from '#consts/validationError.js'
import { lengths } from '#consts/validation.js'
import { z } from 'zod'

const { FIELD_IS_SHORTER_THAN_MIN, FIELD_IS_LONGER_THAN_MAX } = errorMassages
const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = lengths

export const createSubjectValidationSchema = z.object({
  subjectName: z
    .string()
    .min(MIN_NAME_LENGTH, FIELD_IS_SHORTER_THAN_MIN(MIN_NAME_LENGTH))
    .max(MAX_NAME_LENGTH, FIELD_IS_LONGER_THAN_MAX(MAX_NAME_LENGTH))
    .toLowerCase()
    .trim(),
  categoryId: z.string().toLowerCase().trim()
})
