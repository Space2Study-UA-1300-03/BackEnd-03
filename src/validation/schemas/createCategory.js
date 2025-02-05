import { lengths, regex } from '#consts/validation.js'

const { MAX_NAME_LENGTH, MIN_NAME_LENGTH } = lengths
const { NAME_PATTERN } = regex

export const createCategoryValidationSchema = {
  categoryName: {
    type: 'string',
    required: true,
    regex: NAME_PATTERN,
    length: {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH
    }
  },
  icon: {
    type: 'string',
    regex: NAME_PATTERN,
    length: {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH
    }
  },
  color: {
    type: 'string',
    regex: NAME_PATTERN,
    length: {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH
    }
  }
}
