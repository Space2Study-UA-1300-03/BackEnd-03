export const error = {
  BODY_IS_NOT_DEFINED: {
    code: 'BODY_IS_NOT_DEFINED',
    message: 'request body should not be null or undefined'
  },
  CATEGORY_ALREADY_EXISTS: {
    code: 'CATEGORY_ALREADY_EXISTS',
    message: 'Category with the specified name already exists.'
  },
  CATEGORY_NOT_FOUND: {
    code: 'CATEGORY_NOT_FOUND',
    message: 'Categories was not found.'
  },
  SUBJECT_NOT_FOUND: {
    code: 'SUBJECT_NOT_FOUND',
    message: 'Subject was not found.'
  },
  FIELD_IS_NOT_OF_PROPER: (fieldMassage) => ({
    code: 'FIELD_IS_NOT_OF_PROPER',
    message: fieldMassage
  })
}

export const errorMassages = {
  FIELD_IS_SHORTER_THAN_MIN: (length) => ({
    message: `Field is shorter than min length in: ${length}.`
  }),
  FIELD_IS_LONGER_THAN_MAX: (length) => ({
    message: `Field is longer than max length in: ${length}.`
  })
}
