const swaggerUi = require('swagger-ui-express')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')

const {
  config: { CLIENT_URL }
} = require('~/configs/config')
const router = require('~/routes')
const { createNotFoundError } = require('~/utils/errorsHelper')
const errorMiddleware = require('~/middlewares/error')
const swaggerSpec = require('~/initialization/swaggerOptions')

const initialization = (app) => {
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(
    cors({
      origin: process.env.NODE_ENV === 'development' ? true : CLIENT_URL,
      credentials: true,
      methods: 'GET, POST, PATCH, DELETE',
      allowedHeaders: 'Content-Type, Authorization'
    })
  )

  app.use('/', router)
  app.use('/api/#/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.use((_req, _res, next) => {
    next(createNotFoundError())
  })

  app.use(errorMiddleware)
}

module.exports = initialization
