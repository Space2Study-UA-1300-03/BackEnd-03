import Language from '#models/language.js'
import { logger } from '#logger/logger.js'
import { errors } from '#consts/errors.js'
import cache from '#utils/cache.js'

export const getLanguages = async (req, res) => {
  try {
    let languages = cache.get('languages')

    if (!languages) {
      logger.info('Cache is empty, fetching languages from database...')
      languages = await Language.find().sort({ name: 1 })

      if (!languages.length) {
        return res.status(404).json(errors.NOT_FOUND)
      }

      cache.set('languages', languages)
      logger.info('Cache updated with languages from database')
    }

    res.status(200).json(languages)
  } catch (error) {
    logger.error('Error fetching languages:', error)
    res.status(500).json({
      ...errors.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch languages',
    })
  }
}
