import cron from 'node-cron'
import cache from '#utils/cache.js'

/**
 * Scheduled task to clear all cache every 24 hours.
 * Runs at midnight (00:00) UTC daily.
 */
export const clearCache = cron.schedule(
  '0 0 * * *',
  () => {
    console.log('🗑️ Clearing all cache automatically...')
    cache.flushAll()
    console.log('✅ All cache cleared successfully (automatically).')
  },
  { scheduled: false }
)

/**
 * Manual clearing of all cache.
 */
export const clearCacheManually = async () => {
  console.log('🗑️ Clearing all cache manually...')
  cache.flushAll()
  console.log('✅ All cache cleared successfully (manually).')
}

/**
 * Manual clearing of cache for languages only.
 */
export const clearLanguagesCache = async () => {
  console.log('🗑️ Clearing cache for languages...')
  cache.del('languages')
  console.log('✅ Cache for languages cleared successfully.')
}

/**
 * Manual clearing of cache for locations only.
 */
export const clearLocationsCache = async () => {
  console.log('🗑️ Clearing cache for locations...')
  cache.del('countries')
  cache.delByPrefix('cities_')
  console.log('✅ Cache for locations cleared successfully.')
}
