import { gmailCredentials } from '#configs/config.js'
import { createError } from '#utils/errorsHelper.js'
import { templateList } from '#src/emails/index.js'
import EmailTemplates from 'email-templates'
import { sendMail } from '#utils/mailer.js'
import { errors } from '#consts/errors.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '../..')

const emailTemplates = new EmailTemplates({
  views: { root: path.join(rootDir, 'src', 'emails') }
})

export const emailService = {
  sendEmail: async (email, subject, language, text = {}) => {
    const templateToSend = templateList[subject]
    const user = gmailCredentials.user

    if (!templateToSend) {
      throw createError(404, errors.TEMPLATE_NOT_FOUND)
    }

    const langTemplate = templateToSend[language]

    const html = await emailTemplates.render(langTemplate.template, text)

    await sendMail({
      from: `Space2Study <${user}>`,
      to: email,
      subject: langTemplate.subject,
      html
    })
  }
}
