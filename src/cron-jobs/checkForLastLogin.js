import { emailSubject } from '#consts/emailSubject.js'
import { emailService } from '#services/email.js'
import { userService } from '#services/user.js'
import { oneDayInMs } from '#consts/auth.js'
import { CronJob } from 'cron'

const DAYS_TO_SEND_EMAILS = 173
const DAYS_TO_DELETE_USER = 180
const EVERY_DAY_AT_3AM = '00 00 03 * * *'
const timeZone = 'UTC'
const defaultFilter = {
  name: '',
  email: '',
  status: [],
  lastLogin: {
    from: '',
    to: ''
  },
  createdAt: {
    from: '',
    to: ''
  }
}

export const checkUsersForLastLogin = new CronJob(EVERY_DAY_AT_3AM, () => checkLastLogin(), null, false, timeZone)

export const checkLastLogin = async () => {
  const users = await userService.getUsers(defaultFilter)
  const dateNow = new Date()

  return Promise.all(
    users.items.map(async ({ email, firstName, lastLogin, language, _id }) => {
      if (!lastLogin) {
        return
      }

      const differenceInDays = Math.floor((dateNow.getTime() - lastLogin.getTime()) / oneDayInMs)
      if (differenceInDays === DAYS_TO_SEND_EMAILS) {
        await emailService.sendEmail(email, emailSubject.LONG_TIME_WITHOUT_LOGIN, language, { firstName })
      }
      if (differenceInDays >= DAYS_TO_DELETE_USER) {
        await userService.deleteUser(_id)
      }
    })
  )
}
