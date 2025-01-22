import nodemailer from 'nodemailer'
import { google } from 'googleapis'

import { gmailCredentials } from '#configs/config.js'
import { createError } from '#utils/errorsHelper.js'
import { errors } from '#consts/errors.js'
import { logger } from '#logger/logger.js'

const { user, clientId, clientSecret, refreshToken, redirectUri } = gmailCredentials
const { API_TOKEN_NOT_RETRIEVED, EMAIL_NOT_SENT } = errors
const OAuth2 = google.auth.OAuth2

export const getAccessToken = async () => {
  try {
    const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri)

    oAuth2Client.setCredentials({ refresh_token: refreshToken })
    const accessToken = await oAuth2Client.getAccessToken()

    return accessToken
  } catch (err) {
    logger.error(err)
    throw createError(400, API_TOKEN_NOT_RETRIEVED)
  }
}

export const createTransport = async () => {
  try {
    const accessToken = await getAccessToken()
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        type: 'OAuth2',
        user,
        clientId,
        clientSecret,
        refreshToken,
        accessToken
      }
    })

    return transporter
  } catch (err) {
    logger.error(err)
  }
}

export const sendMail = async (mailOptions) => {
  try {
    const transporter = await createTransport()
    await transporter.verify()
    const result = await transporter.sendMail(mailOptions)
    transporter.close()

    return result
  } catch (err) {
    logger.error(err)
    throw createError(400, EMAIL_NOT_SENT)
  }
}
