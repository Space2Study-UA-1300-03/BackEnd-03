import cron from 'node-cron'
import cache from '#utils/cache.js'

/**
 * Scheduled task to clear cache every 24 hours.
 * Runs at midnight (00:00) UTC daily.
 */
export const clearCache = cron.schedule(
  '0 0 * * *',
  () => {
    console.log('🗑️ Clearing cache...')
    cache.flushAll()
    console.log('✅ Cache cleared successfully')
  },
  { scheduled: false }
)
