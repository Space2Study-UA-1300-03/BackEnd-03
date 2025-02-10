export const lengths = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 25,
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 30
}

export const photo = {
  MIMETYPE: ['image/png', 'image/jpeg'],
  FILE_SIZE: 10 * 1024 * 1024,
  FIELDNAME_SIZE: 100
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
