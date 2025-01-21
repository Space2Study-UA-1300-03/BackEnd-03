import { lengths, regex, enums } from '#consts/validation.js'

const { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MAX_NAME_LENGTH, MIN_NAME_LENGTH } = lengths
const { EMAIL_PATTERN, PASSWORD_PATTERN, NAME_PATTERN } = regex
const { ROLE_ENUM } = enums

export const signupValidationSchema = {
  firstName: {
    type: 'string',
    required: true,
    regex: NAME_PATTERN,
    length: {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH
    }
  },
  lastName: {
    type: 'string',
    required: true,
    regex: NAME_PATTERN,
    length: {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH
    }
  },
  email: {
    type: 'string',
    required: true,
    regex: EMAIL_PATTERN
  },
  role: {
    type: 'string',
    required: true,
    enum: ROLE_ENUM
  },
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
