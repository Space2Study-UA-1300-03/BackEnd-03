import { removeUnverifiedUsers } from '#cron-jobs/removeUnverifiedUsers.js'
import { checkUsersForLastLogin } from '#cron-jobs/checkForLastLogin.js'

export const scheduledCronJobs = () => {
  checkUsersForLastLogin.start()
  removeUnverifiedUsers.start()
}
