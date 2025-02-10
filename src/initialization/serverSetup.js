import { databaseInitialization } from '#initialization/database.js'
import { scheduledCronJobs } from '#cron-jobs/scheduledCronJobs.js'
import { initialization } from '#initialization/initialization.js'
import { checkUserExistence } from '#seed/checkUserExistence.js'
import { seedLanguages } from '#seed/seedLanguages.js'
import { config } from '#configs/config.js'
import { logger } from '#logger/logger.js'

const { SERVER_PORT } = config

export const serverSetup = async (app) => {
  await databaseInitialization()
  await checkUserExistence()
  await seedLanguages() 

  initialization(app)

  return app.listen(SERVER_PORT, () => {
    logger.info(`Server is running on port ${SERVER_PORT}`)
    if (process.env.NODE_ENV !== 'development') {
      scheduledCronJobs() 
    }
  })
}
