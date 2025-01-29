import { adminInvitationService } from '#services/adminInvitation.js'

export const sendAdminInvitations = async (req, res) => {
  const { emails } = req.body
  const language = req.lang

  const invitations = await adminInvitationService.sendAdminInvitations(emails, language)

  res.status(201).json(invitations)
}

export const getAdminInvitations = async (req, res) => {
  const invitations = await adminInvitationService.getAdminInvitations()

  res.status(200).json(invitations)
}
