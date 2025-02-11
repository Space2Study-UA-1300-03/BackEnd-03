export const lengths = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 25,
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 30,
  IMG_W: 800,
  IMG_H: 800
}

export const photo = {
  CLOUDINARY_FOLDER: 'Space2Study-UA-1300-03',
  ALLOWED_FORMATS: ['png', 'jpg', 'jpeg'],
  MIMETYPE: ['image/png', 'image/jpeg', 'image/jpg'],
  FILE_SIZE: 10 * 1024 * 1024,
  FIELDNAME_SIZE: 100,
  IMG_QUALITY: 90,
  IMG_FIT: 'cover',
  TO_FORMAT: 'jpeg'
}

export const regex = {
  EMAIL_PATTERN: /^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i,
  PASSWORD_PATTERN: /^(?=.*\d)(?=.*[a-zа-яєії])\S+$/i,
  NAME_PATTERN: /^[a-zа-яєії]+$/i
}

export const enums = {
  APP_LANG_ENUM: ['en', 'ua'],
  SPOKEN_LANG_ENUM: ['English', 'Ukrainian', 'Polish', 'German', 'French', 'Spanish', 'Arabic'],
  PROFICIENCY_LEVEL_ENUM: ['Beginner', 'Intermediate', 'Advanced', 'Test Preparation', 'Professional', 'Specialized'],
  ROLE_ENUM: ['student', 'tutor', 'admin', 'superadmin'],
  LOGIN_ROLE_ENUM: ['student', 'tutor', 'admin'],
  MAIN_ROLE_ENUM: ['student', 'tutor'],
  STATUS_ENUM: ['active', 'blocked'],
  QUESTION_TYPE_ENUM: ['multipleChoice', 'openAnswer', 'oneAnswer'],
  QUIZ_VIEW_ENUM: ['Stepper', 'Scroll'],
  RESOURCES_TYPES_ENUM: ['lessons', 'attachments', 'questions', 'quizzes'],
  OFFER_STATUS_ENUM: ['active', 'draft', 'closed']
}

export const appearances = {
  icon: 'mocked-path-to-icon',
  color: '#66C42C'
}
