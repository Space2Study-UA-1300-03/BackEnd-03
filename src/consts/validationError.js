export const error = {
  BODY_IS_NOT_DEFINED: {
    code: 'BODY_IS_NOT_DEFINED',
    message: 'request body should not be null or undefined'
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
