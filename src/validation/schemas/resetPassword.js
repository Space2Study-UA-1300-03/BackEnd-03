import { lengths, regex } from '#consts/validation.js'

const { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } = lengths
const { PASSWORD_PATTERN } = regex

export const resetPasswordValidationSchema = {
  password: {
    type: 'string',
    required: true,
    length: {
      min: MIN_PASSWORD_LENGTH,
      max: MAX_PASSWORD_LENGTH
    },
    regex: PASSWORD_PATTERN
  }
}
