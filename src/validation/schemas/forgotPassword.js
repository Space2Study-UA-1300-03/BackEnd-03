import { regex } from '#consts/validation.js'

const { EMAIL_PATTERN } = regex

export const forgotPasswordValidationSchema = {
  email: {
    type: 'string',
    required: true,
    regex: EMAIL_PATTERN
  }
}
