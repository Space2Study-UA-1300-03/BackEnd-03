import { databaseInitialization } from '#initialization/database.js'
// import { checkUserExistence } from '#seed/checkUserExistence.js'
import { scheduledCronJobs } from '#cron-jobs/scheduledCronJobs.js'
import { initialization } from '#initialization/initialization.js'
import { config } from '#configs/config.js'
import { logger } from '#logger/logger.js'

export const serverSetup = async (app) => {
  const SERVER_PORT = config.all.SERVER_PORT
  await databaseInitialization()
  // await checkUserExistence() // FIXME: Uncomment this line to seed super admin
  initialization(app)
  return app.listen(SERVER_PORT, () => {
    logger.info(`Server is running on port ${SERVER_PORT}`)
    if (process.env.NODE_ENV !== 'test') {
      scheduledCronJobs()
    }
  })
}
