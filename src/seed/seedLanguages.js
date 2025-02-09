import Language from '#models/language.js'
import { logger } from '#logger/logger.js'
import cache from '#utils/cache.js'

const languages = [
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Estonian',
  'Finnish',
  'French',
  'German',
  'Hungarian',
  'Icelandic',
  'Italian',
  'Japanese',
  'Korean',
  'Norwegian',
  'Polish',
  'Portuguese (Brazil)',
  'Portuguese (Portugal)',
  'Romanian',
  'Slovak',
  'Spanish',
  'Swedish',
  'Ukrainian',
]

export const seedLanguages = async () => {
  try {
    const existingLanguages = await Language.find()
    const existingLanguageNames = existingLanguages.map((lang) => lang.name.toLowerCase())
  
    const newLanguages = languages
      .filter((name) => !existingLanguageNames.includes(name.toLowerCase()))
      .map((name) => ({ name }))
  
    if (newLanguages.length > 0) {
      await Language.insertMany(newLanguages)
      logger.info(`Languages seeded successfully: ${newLanguages.map((lang) => lang.name).join(', ')}`)
  
      cache.del('languages')
      logger.info('Cache cleared after seeding languages')
    } else {
      logger.info('All languages already exist in the database. Seeding skipped.')
    }
  } catch (error) {
    logger.error(`Error seeding languages: ${error.message}`)
  }
}

