import { removeUnverifiedUsers } from '#cron-jobs/removeUnverifiedUsers.js'
import { checkUsersForLastLogin } from '#cron-jobs/checkForLastLogin.js'
import { clearCache } from '#cron-jobs/clearCache.js'

export const scheduledCronJobs = () => {
  checkUsersForLastLogin.start()
  removeUnverifiedUsers.start()
  clearCache.start() 
}
