import AdminInvitation from '#models/adminInvitation.js'
import { emailSubject } from '#consts/emailSubject.js'
import { emailService } from '#services/email.js'

export const adminInvitationService = {
  sendAdminInvitations: async (emails, language) => {
    return Promise.all(
      emails.map(async (email) => {
        const invitation = await AdminInvitation.create({ email })

        await emailService.sendEmail(email, emailSubject.ADMIN_INVITATION, language, { email })

        return invitation
      })
    )
  },

  getAdminInvitations: async () => {
    return await AdminInvitation.find().lean().exec()
  }
}
