import { createError } from '#utils/errorsHelper.js'
import { emailService } from '#services/email.js'
import { errors } from '#consts/errors.js'
import { logger } from '#logger/logger.js'

export const sendEmail = async (req, res) => {
  const { email, subject, text } = req.body
  const lang = req.lang

  if (!email || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  try {
    await emailService.sendEmail(email, subject, lang, text)
    res.status(204).end()
  } catch (error) {
    logger.error(error)
    throw createError(400, errors.API_TOKEN_NOT_RETRIEVED)
  }
}
