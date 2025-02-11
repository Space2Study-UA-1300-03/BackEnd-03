import mongoose from 'mongoose'
import Language from '#models/language.js'
import { logger } from '#logger/logger.js'
import cache from '#utils/cache.js'
import { config } from '#configs/config.js'

const languages = [
  'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Finnish', 'French', 'German', 'Hungarian',
  'Icelandic', 'Italian', 'Japanese', 'Korean', 'Norwegian', 'Polish', 'Portuguese (Brazil)',
  'Portuguese (Portugal)', 'Romanian', 'Slovak', 'Spanish', 'Swedish', 'Ukrainian',
]

const seedLanguages = async () => {
  try {
    logger.info('Starting the seeding process for languages...')

    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info('Connected to MongoDB.')

    const existingLanguages = new Set(
      (await Language.find({}, 'name')).map((lang) => lang.name.toLowerCase())
    )

    const newLanguages = languages.filter((name) => !existingLanguages.has(name.toLowerCase()))

    if (newLanguages.length > 0) {
      await Language.insertMany(newLanguages.map((name) => ({ name })))
      newLanguages.forEach((name) => logger.info(`Language "${name}" has been added.`))
      cache.del('languages')
      logger.info('Cache cleared after seeding languages.')
    } else {
      logger.info('All languages already exist in the database. Seeding skipped.')
    }

    logger.info('Seeding process for languages completed successfully.')
  } catch (error) {
    logger.error(`Error seeding languages: ${error.message}`)
  } finally {
    await mongoose.disconnect()
    logger.info('Disconnected from MongoDB.')
    process.exit()
  }
}

seedLanguages()
