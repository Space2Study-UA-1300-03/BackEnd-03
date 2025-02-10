export const error = {
  /**
   * @description Error message when response status is 400
   */

  INVALID_ID: {
    code: 'INVALID_ID',
    message: 'The ID is either invalid.'
  },

  /**
   * @description Error message when response status is 422
   */
  BODY_IS_NOT_DEFINED: {
    code: 'BODY_IS_NOT_DEFINED',
    message: 'Request body should not be null or undefined'
  },
  FILE_IS_NOT_DEFINED: {
    code: 'FILE_IS_NOT_DEFINED',
    message: 'Request file should not be null or undefined'
  },
  BUFFER_IS_NOT_DEFINED: {
    code: 'BUFFER_IS_NOT_DEFINED',
    message: 'Request buffer should not be null or undefined'
  },

  /**
   * @description Error message when response status is 409
   */
  CATEGORY_ALREADY_EXISTS: {
    code: 'CATEGORY_ALREADY_EXISTS',
    message: 'Category with the specified name already exists.'
  },

  /**
   * @description Error message when response status is 404
   */
  CATEGORY_NOT_FOUND: {
    code: 'CATEGORY_NOT_FOUND',
    message: 'Categories was not found.'
  },
  SUBJECT_NOT_FOUND: {
    code: 'SUBJECT_NOT_FOUND',
    message: 'Subject was not found.'
  },

  /**
   * @description Error message when response status is 502
   */
  BAD_GATEWAY_CLOUDINARY: {
    code: 'BAD_GATEWAY_CLOUDINARY',
    message: 'Upload error in Cloudinary.'
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
  }),
  MAX_FILE_SIZE: (size) => ({
    message: `The file size cannot be more than: ${size}mb.`
  }),
  INVALID_MIMETYPE: (mimetype) => ({
    message: `The mimetype should only be [${mimetype}].`
  })
}
