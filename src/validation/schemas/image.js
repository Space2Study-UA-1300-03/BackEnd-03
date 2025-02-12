import { errorMassages } from '#consts/validationError.js'
import { photo } from '#consts/validation.js'
import { z } from 'zod'

const { INVALID_MIMETYPE, MAX_FILE_SIZE } = errorMassages
const { FILE_SIZE, MIMETYPE } = photo

export const imageValidationSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string().refine((mime) => MIMETYPE.includes(mime), INVALID_MIMETYPE(MIMETYPE)),
  buffer: z.instanceof(Buffer),
  size: z.number().max(FILE_SIZE, MAX_FILE_SIZE(FILE_SIZE))
})
