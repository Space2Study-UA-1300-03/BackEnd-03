import { clearCacheManually, clearLanguagesCache, clearLocationsCache } from '#cron-jobs/clearCache.js'
import { logger } from '#logger/logger.js'

const manualClear = async () => {
  const cacheType = process.argv[2]

  try {
    switch (cacheType) {
    case 'all':
      await clearCacheManually()
      logger.info('All cache cleared successfully.')
      break
    case 'languages':
      await clearLanguagesCache()
      logger.info('Languages cache cleared successfully.')
      break
    case 'locations':
      await clearLocationsCache()
      logger.info('Locations cache cleared successfully.')
      break
    default:
      logger.warn('Invalid cache type specified. Use "all", "languages", or "locations".')
      process.exit(1)
    }
    process.exit(0)
  } catch (error) {
    logger.error(`Error while clearing cache (${cacheType}): ${error.message}`)
    process.exit(1)
  }
}

manualClear()
