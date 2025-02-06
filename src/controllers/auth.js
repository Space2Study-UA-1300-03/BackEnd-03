import { config, gmailCredentials } from '#configs/config.js'
import { OAuth2Client } from 'google-auth-library'
import { authService } from '#services/auth.js'
import { tokenNames } from '#consts/auth.js'
import { oneDayInMs } from '#consts/auth.js'

const { REFRESH_TOKEN, ACCESS_TOKEN } = tokenNames
const { COOKIE_DOMAIN } = config
const { clientId } = gmailCredentials

const client = new OAuth2Client(clientId)

const COOKIE_OPTIONS = {
  maxAge: oneDayInMs,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: COOKIE_DOMAIN
}

export const signup = async (req, res) => {
  const { role, firstName, lastName, email, password } = req.body
  const lang = req.lang

  const userData = await authService.signup(role, firstName, lastName, email, password, lang)

  res.status(201).json(userData)
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const tokens = await authService.login(email, password)

  res.cookie(ACCESS_TOKEN, tokens.accessToken, COOKIE_OPTIONS)
  res.cookie(REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS)

  delete tokens.refreshToken

  res.status(200).json(tokens)
}

export const logout = async (req, res) => {
  const { refreshToken } = req.cookies

  await authService.logout(refreshToken)

  res.clearCookie(REFRESH_TOKEN)
  res.clearCookie(ACCESS_TOKEN)

  res.status(204).end()
}

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    res.clearCookie(ACCESS_TOKEN)

    return res.status(401).end()
  }

  const tokens = await authService.refreshAccessToken(refreshToken)

  res.cookie(ACCESS_TOKEN, tokens.accessToken, COOKIE_OPTIONS)
  res.cookie(REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS)

  delete tokens.refreshToken

  res.status(200).json(tokens)
}

export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body
  const lang = req.lang

  await authService.sendResetPasswordEmail(email, lang)

  res.status(204).end()
}

export const updatePassword = async (req, res) => {
  const { password } = req.body
  const resetToken = req.params.token
  const lang = req.lang

  await authService.updatePassword(resetToken, password, lang)

  res.status(204).end()
}

export const verifyEmail = async (req, res) => {
  const { token } = req.params

  const message = await authService.verifyEmail(token)

  res.status(200).json(message)
}

export const verifyIdToken = async (req, res) => {
  const { token, role, type } = req.body
  const lang = req.lang

  const idToken = token?.credential

  if (!idToken) {
    return res.status(400).json({ error: 'ID token is required' })
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: clientId
  })

  const payload = ticket.getPayload()
  const tokens = await authService.googleLogin(payload, type, role, lang);

  res.cookie(ACCESS_TOKEN, tokens.accessToken, COOKIE_OPTIONS)
  res.cookie(REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS)

  delete tokens.refreshToken

  res.status(200).json(tokens)
}
